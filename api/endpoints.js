const express = require('express');
const app = express();
const port = 3001;

var cors = require('cors');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
app.use(cors());
app.use(jsonParser)
app.use(bodyParser.urlencoded({
    extended: true
  }))

app.listen(port, ()=>{console.log("Heyyyyy")})

const userdetails = [
   { id:1, name:"Eunoia Participant 01", password:"EUCode1", auth:"user" },
   { id:2, name:"Eunoia Participant 02", password:"EUCode2", auth:"user" },
   { id:3, name:"Eunoia Participant 03", password:"EUCode3", auth:"user" },
   { id:4, name:"Administrator", password:"admin@1234", auth:"admin" },
]

const values = [345.44, 168.90, 20.76, 327.44, 69.38, 1736.23, 185.11, 2210.03, 898.98, 348.66, 200.07, 88.76, 178.32, 30.64, 40.50, 658.01, 1115.65, 413.25, 115.2, 85.7, 333.333, 124.32, 20.01, 2001.00,];

let lender, borrower, value;
let lender2, borrower2;
app.post('/loginapi',(req, res) => {
    const username=req.body.username;
    const password=req.body.password;
    let user = userdetails.find(o => o.name === username);
    if(user.name === username && user.password === password)
    {
        let result = {flag : true, message : "", auth : user.auth};
        res.send(JSON.stringify(result));
    }
    else
    {
        let result = {flag : false, message : "Username or password is incorrect", auth : user.auth};
        res.send(JSON.stringify(result));
    }

    
})

app.post('/changevalue',(req, res) => {
    console.log(values[req.body.index]);
    values[req.body.index]=req.body.value;
    console.log(values[req.body.index]);
})

app.get('/changevalue',(req,res) => {
    res.send(JSON.stringify(values));
})

app.post('/loanadminapi',(req, res) => {
    lender=req.body.lender;
    borrower=req.body.borrower;
    value = req.body.value;
    console.log("Hello");
})

app.post('/loanuserapi', (req, res) => {
    let flag = req.body.type;
    
    if(flag === 'lend')
    {
        lender2 = req.body.user;
        console.log(lender+"\n"+lender2);
        if(lender2 === lender)
        {
            res.send(value);
        }
    }
    else if(flag === 'borrow')
    {
        borrower2 = req.body.user;
        console.log(borrower+"\n"+borrower2);
        if(borrower2 === borrower)
        {
            res.send(value);
        }
    }

    
})