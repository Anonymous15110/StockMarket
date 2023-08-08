import * as React from 'react';
import { connect } from 'react-redux';
import { loanValues } from '../../state/stockMarket/stockMarketActions';
// import { Redirect, Switch } from 'react-router-dom';

interface LoanProps {
  lend: (amount: number) => void;
  borrow: (amount: number) => void;
}

const auth = sessionStorage.getItem('auth');
const onSubmit = (event: React.FormEvent) => {

  event.preventDefault();
  let loanData = {
    lender: (document.getElementById('lend') as HTMLInputElement).value,
    borrower: (document.getElementById('borrow') as HTMLInputElement).value,
    value: (document.getElementById('value') as HTMLInputElement).value,
  };

  fetch('https://stock-market-express.vercel.app/loanadminapi', {
    method: 'POST',
    body: JSON.stringify(loanData),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
};
const username = sessionStorage.getItem('username')!;

class Loan extends React.Component<LoanProps> {

  render() {
    const { lend, borrow } = this.props;
    const css = `html {
            height: 100%;
          }
          body {
            margin:0;
            padding:0;
            font-family: sans-serif;
            
          }
          
          .login-box {
            height:450px;
            left: 0px;
            right: 0px;
            margin: auto;
            width: 600px;
            padding: 40px;
            background: linear-gradient(#141e30, #243b55);
            box-sizing: border-box;
            box-shadow: 0 15px 25px rgba(0,0,0,.6);
            border-radius: 10px;
            z-index:10;
          }
          
          .login-box h2 {
            margin: 0 0 30px;
            padding: 0;
            color: #fff;
            text-align: center;
          }
          
          .login-box .user-box {
            position: relative;
          }
          
          .login-box .user-box input {
            width: 100%;
            padding: 10px 0;
            font-size: 16px;
            color: #fff;
            margin-bottom: 30px;
            border: none;
            border-bottom: 1px solid #fff;
            outline: none;
            background: transparent;
          }
          .login-box .user-box label {
            position: absolute;
            top:0;
            left: 0;
            padding: 10px 0;
            font-size: 16px;
            color: #fff;
            pointer-events: none;
            transition: .5s;
          }
          
          .login-box .user-box input:focus ~ label,
          .login-box .user-box input:valid ~ label {
            top: -20px;
            left: 0;
            color: #03e9f4;
            font-size: 12px;
          }
          
          .login-box form input[type="submit"] {
            position: relative;
            display: inline-block;
            padding: 10px 20px;
            color: #03e9f4;
            font-size: 16px;
            text-decoration: none;
            text-transform: uppercase;
            overflow: hidden;
            transition: .5s;
            margin-top: 40px;
            letter-spacing: 4px
          }
          
          .login-box input[type="submit"]:hover {
            background: #03e9f4;
            color: #fff;
            border-radius: 5px;
          }
          
          .login-box input[type="submit"] span {
            position: absolute;
            display: block;
          }
          
          .login-box input[type="submit"] span:nth-child(1) {
            top: 0;
            left: -100%;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #03e9f4);
            animation: btn-anim1 1s linear infinite;
          }
          
          @keyframes btn-anim1 {
            0% {
              left: -100%;
            }
            50%,100% {
              left: 100%;
            }
          }
          
          .login-box input[type="submit"] span:nth-child(2) {
            top: -100%;
            right: 0;
            width: 2px;
            height: 100%;
            background: linear-gradient(180deg, transparent, #03e9f4);
            animation: btn-anim2 1s linear infinite;
            animation-delay: .25s
          }
          
          @keyframes btn-anim2 {
            0% {
              top: -100%;
            }
            50%,100% {
              top: 100%;
            }
          }
          button{
            width : 120px;
            border-radius:5px;
            padding: 20px;
            border: 1px solid black;
          }
          button:active{
            background-color:gray;
          }

          .login-box input[type="submit"] span:nth-child(3) {
            bottom: 0;
            right: -100%;
            width: 100%;
            height: 2px;
            background: linear-gradient(270deg, transparent, #03e9f4);
            animation: btn-anim3 1s linear infinite;
            animation-delay: .5s
          }
          
          @keyframes btn-anim3 {
            0% {
              right: -100%;
            }
            50%,100% {
              right: 100%;
            }
          }
          
          .login-box input[type="submit"] span:nth-child(4) {
            bottom: -100%;
            left: 0;
            width: 2px;
            height: 100%;
            background: linear-gradient(360deg, transparent, #03e9f4);
            animation: btn-anim4 1s linear infinite;
            animation-delay: .75s
          }
          
          @keyframes btn-anim4 {
            0% {
              bottom: -100%;
            }
            50%,100% {
              bottom: 100%;
            }
          }
          `;
    if (auth === 'admin') {
      return (
        // tslint:disable-next-line:max-line-length
        <div style={{ zIndex: '10', position: 'relative', backgroundColor: 'white', }}>
          <style>
            {css}
          </style>
          <div className="login-box" >

            <h2>Manage</h2>
            <form onSubmit={onSubmit}>
              <div className="user-box" style={{ position: 'relative' }}>
                <input type="text" name="" id="lend" />
                <label>Lender</label>
              </div>
              <div className="user-box">
                <input type="text" name="" id="borrow" />
                <label>Borrower</label>
              </div>
              <div className="user-box">
                <input type="number" name="" id="value" />
                <label>Value</label>
              </div>
              <input type="submit" value={'Submit'} />

            </form>
          </div>
        </div>
      );
    } else {
      return (
        // tslint:disable-next-line:max-line-length
        <div style={{ zIndex: '10', position: 'relative', backgroundColor: 'white', display: 'flex', height: '84vh', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <style>
            {css}
          </style>
          <button onClick={() => { lend(50); }}>Loan</button>
          <button onClick={() => { borrow(50); }}>Borrow</button>
        </div>
      );
    }
  }
}
let loan = 5;
let borr = 5;
// tslint:disable-next-line: no-any
const mapDispatchToProps = (dispatch: any) => ({
  lend: (amount: number) => {
    const loanData = {
      user: username.substring(username.length - 1),
      type: 'lend',
    };

    fetch('https://stock-market-express.vercel.app/loanuserapi', {
      method: 'POST',
      body: JSON.stringify(loanData),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then(response => response.json())
      .then(json => { loan = json; if (Number.isInteger(loan)) { dispatch(loanValues(loan)); } })
      .catch(err => console.log(err));
  },
  borrow: (amount: number) => {
    const loanData = {
      user: username.substring(username.length - 1),
      type: 'borrow',
    };

    fetch('https://stock-market-express.vercel.app/loanuserapi', {
      method: 'POST',
      body: JSON.stringify(loanData),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then(response => response.json())
      .then(json => { borr = json; if (Number.isInteger(borr)) { dispatch(loanValues(-borr)); } })
      .catch(err => console.log(err));
  },
});

export default connect(null, mapDispatchToProps)(Loan);