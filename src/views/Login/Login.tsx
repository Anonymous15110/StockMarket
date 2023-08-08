import * as React from 'react';
// import { Redirect, Switch } from 'react-router-dom';

interface LoginProps {

}
interface User {
  flag: boolean;
  message: string;
  auth: string;
}
let stocks = [
  {
    'value': 345.44,
  },
  {
    'value': 168.90,
  },
  {
    'value': 20.76,
  },
  {
    'value': 327.44,
  },
  {
    'value': 69.38,
  },
  {
    'value': 1736.23,
  },
  {
    'value': 185.11,
  },
  {
    'value': 2210.03,
  },
  {
    'value': 898.98,
  },
  {
    'value': 348.66,
  },
  {
    'value': 200.07,
  },
  {
    'value': 88.76,
  },
  {
    'value': 178.32,
  },
  {
    'value': 30.64,
  },
  {
    'value': 40.50,
  },
  {
    'value': 658.01,
  },
  {
    'value': 1115.65,
  },
  {
    'value': 413.25,
  },
  {
    'value': 115.2,
  },
  {
    'value': 85.7,
  },
  {
    'value': 333.333,
  },
  {
    'value': 124.32,
  },
  {
    'value': 20.01,
  },
  {
    'value': 2001.00,
  }
];
const array = JSON.stringify(stocks);
const onLogin = (event: React.FormEvent) => {

  event.preventDefault();
  let signInData = {
    username: (document.getElementById('username') as HTMLInputElement).value,
    password: (document.getElementById('password') as HTMLInputElement).value,
  };

  fetch('https://stock-market-express.vercel.app/loginapi', {
    method: 'POST',
    body: JSON.stringify(signInData),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  })
    .then(response => response.json())
    .then(json => authentication(json))
    .catch(err => console.log(err));
};
function authentication(res: User) {
  if (res.flag) {
    sessionStorage.setItem('username', (document.getElementById('username') as HTMLInputElement).value);
    sessionStorage.setItem('auth', res.auth);
    sessionStorage.setItem('stocksList', array);
    window.location.replace('/depot');
  } else {
    console.log(res.message);
  }
}
class Login extends React.Component<LoginProps> {
  render() {
    const css = `html {
            height: 100%;
          }
          body {
            margin:0;
            padding:0;
            font-family: sans-serif;
            
          }
          
          .login-box {
            position: absolute;
            height:383.49px;
            left: 0px;
            right: 0px;
            top: 0px;
            bottom: 0px;
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
    console.log('lol hi');
    return (
      // tslint:disable-next-line:max-line-length
      <div style={{ zIndex: '10', height: '100vh', width: '100wv', position: 'relative', backgroundColor: 'white' }}>
        <style>
          {css}
        </style>
        <div className="login-box" >

          <h2>Login</h2>
          <form onSubmit={onLogin}>
            <div className="user-box" style={{ position: 'relative' }}>
              <input type="text" name="" id="username" />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input type="password" name="" id="password" />
              <label>Password</label>
            </div>
            <input type="submit" value={'Submit'} />

          </form>
        </div>
      </div>
    );
  }
}

export default Login;