import React from 'react';
import ReactDOM from 'react-dom';
import Login from './views/Login'
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Login />, document.getElementById('root'));
//ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
