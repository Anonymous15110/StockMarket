import * as moment from 'moment';
import { delay } from 'redux-saga';
import { put, select, takeEvery } from 'redux-saga/effects';
import { addNotification } from '../../components/NotificationSystem';
import { cloneState, FinancialSnapshot, Stock } from '../AppState';
import { StockConfig as Config } from '../Config';
import { changeAccountValue } from '../depot/depotActions';
import { getAccountValue } from '../depot/depotSelector';
import {
    addStocks,
    BUY_OR_SELL_STOCKS,
    BuyOrSellStockAction,
    CALCULATE_NEXT_STOCK_VALUES,
    calculateNextStockValues,
    changeStockQuantity,
    LOAD_STOCKS,
    LOAN_VALUES,
    LoanAction,
    UpdateStockData,
    updateStocks
} from './stockMarketActions';
import { getStocks } from './stockSelector';

function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function getValueChange(valueHistory: FinancialSnapshot[]) {
    const oldestValue = valueHistory[0].value;
    const newestValue = valueHistory[valueHistory.length - 1].value;
    if (oldestValue && newestValue) {
        return (newestValue - oldestValue) / oldestValue * 100;
    }
    return 0;
}

const stockJson = require('./stocks.json');

function getNextValue(currentValue: number, volatility: number): number {

    volatility = volatility / 100;
    const random = getRandomArbitrary(0, 1);
    let changePercent = 2 * volatility * random;
    if (changePercent > volatility) {
        changePercent -= (2 * volatility);
    }
    const changeAmount = currentValue * changePercent;
    const nextAmount = currentValue + changeAmount;

    if (nextAmount <= 0) {
        return getNextValue(currentValue, volatility);
    }
    return Number(nextAmount.toFixed(2));
}

function* loadinitialStocks() {
    let stocks: Stock[] = stockJson;

    const loadedStocks: Stock[] = yield select(getStocks);
    const stocksCached = loadedStocks && loadedStocks.length > 0;
    if (stocksCached) {
        stocks = loadedStocks;
    }

    // set Default values
    stocks.forEach(stock => {
        if (!stocksCached) {
            stock.quantity = 0;
        }
        stock.valueHistory = [];

        for (let i = Config.points(); i >= 0; i--) {
            const nextValue = getNextValue(stock.value, stock.volatility);
            stock.valueHistory.push({
                value: nextValue,
                date: moment().subtract(i * Config.interval, 'seconds').format('HH:mm'),
            });
            stock.value = nextValue;
        }

        stock.valueChange = getValueChange(stock.valueHistory);
    });

    yield put(addStocks(stocks));
    yield put(calculateNextStockValues());
}

function* buyOrSellStocks(action: BuyOrSellStockAction) {
    // search the stock to buy
    let stocks: Stock[] = yield select(getStocks);
    const actionStock: Stock | undefined = stocks.find(s => s.name === action.stockName);

    if (!actionStock) {
        addNotification({
            level: 'error',
            message: 'Stock with name ' + action.stockName + ' could not be found'
        });
        return;
    }

    const accountValue = yield select(getAccountValue);

    // check if enought money
    const totalStockBuyValue = actionStock!.value * action.amount;
    if (accountValue < totalStockBuyValue) {
        addNotification({
            level: 'error',
            message: 'Not enough Money'
        });
        return;
    }

    // check if you can sell/buy amount of stocks
    if (actionStock.quantity + action.amount < 0) {
        addNotification({
            level: 'error',
            message: 'Cant sell stock you dont own'
        });
        return;
    }

    // if it's get to here everything is valid

    // Buy Stocks
    // update stocks in Store
    yield put(changeStockQuantity(action.stockName, action.amount));
    yield put(changeAccountValue(-totalStockBuyValue));
    stocks = yield select(getStocks);
}
function* loan(action: LoanAction) {
    const accountValue = yield select(getAccountValue);

    // check if enought money
    if (accountValue < action.amount) {
        addNotification({
            level: 'error',
            message: 'Not enough Money'
        });
        return;
    }

    // if it's get to here everything is valid

    // Buy Stocks
    // update stocks in Store
    yield put(changeAccountValue(-action.amount));
}

let res: string[] = [];
let newValue: number;
function* calculateAllNextStockValues() {
    const stocks: Stock[] = yield select(getStocks);
    const updates: UpdateStockData[] = [];
    const st = JSON.parse(sessionStorage.getItem('stocksList')!);
    fetch('https://stock-market-express.vercel.app/changevalue', {
        method: 'GET',
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
        .then(response => response.json())
        .then(json => { let arr = JSON.stringify(json); res = arr.substring(1, arr.length - 1).split(','); })
        .catch(err => console.log(err));
    let i = 0;
    for (let s of stocks) {
        console.log(res);
        if (res.length !== 0 && res !== undefined) {
            if (st[i].value === parseFloat(res[i])) {
                console.log(parseFloat(res[i]));
                newValue = getNextValue(s.value, s.volatility);
            } else {
                console.log(parseFloat(res[i]));
                newValue = parseFloat(res[i]);
                st[i].value = parseFloat(res[i]);
                sessionStorage.setItem('stocksList', JSON.stringify(st));
                console.log('ahh');
            }
            var valueHistory = cloneState(s.valueHistory);
            valueHistory.splice(0, 1); // delete first entry
            valueHistory.push({
                value: newValue,
                date: moment().format('HH:mm')
            });

            const valueChange = getValueChange(valueHistory);

            updates.push({
                stockName: s.name,
                stock: {
                    ...s,
                    valueHistory: valueHistory,
                    value: newValue,
                    valueChange: Number(valueChange.toFixed(2))
                }
            });
            i++;
        }

    }

    yield put(updateStocks(updates));
    yield delay(Config.interval * 1000);
    yield put(calculateNextStockValues());
}

function* stockMarketSaga() {
    yield takeEvery(LOAD_STOCKS, loadinitialStocks);
    yield takeEvery(BUY_OR_SELL_STOCKS, buyOrSellStocks);
    yield takeEvery(LOAN_VALUES, loan);
    yield takeEvery(CALCULATE_NEXT_STOCK_VALUES, calculateAllNextStockValues);
}

export default stockMarketSaga;