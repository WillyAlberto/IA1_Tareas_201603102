PORT = 4000
HOST = 'localhost'
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());


app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    //res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    //res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    //res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get('/', (req, res, next) => {
    res.send('53');
})

app.listen(PORT, HOST, ()=>{
    console.log(`Escuchando puerto: http://${HOST}:${PORT}`)
})
