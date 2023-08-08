import * as React from 'react';
import { getCorrectIconForType } from '../../../util/GetCorrectIcon';
import { Stock } from '../../../state/AppState';
import { PriceTag } from '../../../components/PriceTag';

interface StockDetailsProps {
    stock: Stock;
    index: number;
}

const manageClick = (index: number) => {
    let textbox = document.getElementById('textbox' + index)!;
    let button = document.getElementById('button' + index)!;
    if (textbox.style.display === 'none') {
        console.log(index);
        textbox.style.display = 'table-cell';
        button.textContent = 'Enter';
        button.style.padding = '10px';
    } else if (textbox.style.display === 'table-cell') {
        textbox.style.display = 'none';
        button.textContent = 'Change Price';
        button.style.padding = '1px 4px';

        let obj = { value: parseFloat((document.getElementById('input' + index) as HTMLInputElement).value), index: index };
        console.log(obj.value);
        fetch('https://stock-market-express.vercel.app/changevalue', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        }).then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err));
    }
};

export class StockDetails extends React.Component<StockDetailsProps> {

    getArrowIcon(valueChange: number) {
        if (valueChange > 0) {
            return 'icon-arrow-up';
        } else if (valueChange < 0) {
            return 'icon-arrow-down';
        } else {
            return 'icon-arrow-straight';
        }
    }

    getColor(valueChange: number) {
        if (valueChange > 0) {
            return 'green';
        } else if (valueChange < 0) {
            return 'red';
        } else {
            return '';
        }
    }

    render() {
        const { stock } = this.props;
        const { index } = this.props;
        const auth = sessionStorage.getItem('auth');
        return (
            <table>
                <tbody>
                    <tr>
                        <td className="bold">Price:</td>
                        <td className="stockDetails"><PriceTag value={stock.value} /></td>
                        <td className="changeBtn">
                            {
                                auth === 'admin' && <button id={'button' + index} onClick={() => manageClick(index)} style={{ fontSize: '12px', border: '1px black solid', backgroundColor: '#333', padding: '1px 4px', borderRadius: '5px', color: 'white' }}>Change Price</button>}

                        </td>
                    </tr>
                    <tr>
                        <td id={'textbox' + index} colSpan={3} style={{ display: 'none' }}><input id={'input' + index} type="text" style={{ margin: '5px' }} /></td>
                    </tr>
                    <tr>
                        <td className="bold">Category:</td>
                        <td className="stockDetails small-padding-top">
                            <i title={stock.type} className={getCorrectIconForType(stock.type) + ' category-icon'} />
                        </td>
                    </tr>
                    <tr>
                        <td className="bold">Change:</td>
                        <td className={'stockDetails ' + this.getColor(stock.valueChange)}>
                            {stock.valueChange.toFixed(2)}%
                            &nbsp;
                            <i className={this.getArrowIcon(stock.valueChange)} />
                        </td>
                    </tr>
                    <tr className="small-padding-top">
                        <td className="bold">Owning:</td>
                        <td className="stockDetails">{stock.quantity}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}