const express = require('express')
require('dotenv').config()
const http = require("http")
const cors  = require("cors")
const morgan = require("morgan")
const { conn } = require('./db.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require("../Routes/index.js")

const app = express()
const server = http.createServer(app)
const port = /* process.env.PORT || */ 3001

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(cors())
app.use(morgan("dev"))

app.use('/api', routes);

conn.sync({ force: true }).then(() => {
    server.listen(3001, () => {
      console.log('escuchando puerto 3001'); // eslint-disable-line no-console
    });
  });