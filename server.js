require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(express.static('public'));

let fiveMins = ['No one'];
let tenMins = ['No one'];
let fifteenMins = ['No one'];
let twentyMins = ['No one'];

app.post('/api/whois', (req, res) => {
    console.log(req.body);
    twentyMins = fifteenMins;
    fifteenMins = tenMins;
    tenMins = fiveMins;
    fiveMins = req.body['whois'];

    console.log('Five Minutes ' + fiveMins + 'Ten Minutes ' + tenMins + 'Fifteen Minutes ' + fifteenMins + 'Twenty Minutes ' + twentyMins)

    res.json({'success': 'Lists updated succesfully'})
})

app.get('/api/list', (req, res) => {
    res.json({
        'fiveMins': fiveMins,
        'tenMins': tenMins,
        'fifteenMins': fifteenMins,
        'twentyMins': twentyMins
    })
})

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/index.html');
});

app.listen(process.env.PORT, function() {
    console.log('Listening on port ' + process.env.PORT)
})