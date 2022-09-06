
require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const PORT = process.env.PORT;

const flatroute = require('./routes/flat.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use(morgan('dev'));

app.use('/flats', flatroute);

const server = app.listen(PORT, () => {
  console.log("server is running on port 4000");
})

