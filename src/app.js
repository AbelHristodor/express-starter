const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const app = express();

const middlewares = require('./middlewares.js');
const api = require('./api');

// Allows only requests from a list of domains
var whitelist = ['http://localhost:4000', 'http://localhost:3000']; //white list consumers
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};

// Standard middlewares
app.use(morgan(process.env.LOGGER_FORMAT));
app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// API routes
app.use('/api', api);

// Route not found middleware
app.use(middlewares.notFound);

// Error handlers after all other middlewares
app.use(middlewares.errorHandler);

// Starting Server
const port = process.env.EXPRESS_PORT || 3000
const host = process.env.EXPRESS_HOST || 'localhost'

app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://${host}:${port}`)
    /* eslint-enable no-console */
})