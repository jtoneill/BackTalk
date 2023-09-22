require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const router = require('./routes');

const app = express();

app.use(morgan('dev'));
// app.use(cors());
// app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/', router);

app.listen(process.env.SV_PORT);
console.log(`Listening at http://localhost:${process.env.SV_PORT}`);