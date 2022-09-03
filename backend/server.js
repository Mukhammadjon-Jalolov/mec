//var http = require('http');
var mysql = require('mysql');
const fs = require('fs');

require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use(morgan('dev'));


//	******************************************** MYSQL CONNECTION. GETTING DATA FROM DATABASE ****************************************************
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "variables"
});

let resultsArr = [];

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM allvariables", function(err, result, fields){
	  if(err) throw err;

	  result.forEach((el) => {
		  resultsArr.push(el)
	  })
	  
	  console.log(resultsArr);
  })
  console.log("Connected!");
});

function base64_encode(file){
	return fs.readFileSync(file, 'base64');
}


app.get("/allvars", function(req, res) {
  res.json(resultsArr);
});

app.post("/savevar", function(req, res) {
	console.log(req.body)
  });


app.listen(4000, function(){
  console.log("server is running on port 4000");
})

