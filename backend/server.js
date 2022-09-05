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
  /*
  con.query("SELECT * FROM allvariables", function(err, result, fields){
	  if(err) throw err;

	  result.forEach((el) => {
		  resultsArr.push(el)
	  })
	  
	  console.log(resultsArr);
  })
  */
  console.log("Connected!");
});

function base64_encode(file){
	return fs.readFileSync(file, 'base64');
}


app.get("/getall", function(req, res) {
  //resultsArr = [];

  con.query("SELECT * FROM allvariables", function(err, result, fields){
    if(err) throw err;

    // *********************** THIS PART SEEMS UNNECCESSARY ***************************
    /*result.forEach((el) => {
		  resultsArr.push(el)
	  })*/

    res.json(result);
    console.log(result);

  })

  //res.json(result);
  
});

app.post("/savenew", function(req, res) {
	console.log(typeof(req.body.city))
  let newquery = "INSERT INTO allvariables (city, address, housenumber, color, rooms) values ('" + req.body.city + "', '" + req.body.address + "', '" + req.body.housenumber + "', '" + req.body.color + "', '" + req.body.rooms + "')";

  con.query(newquery, function(err, result, fields){
    if(err) throw err;
      //res.json("Sucessfully inserted!");
  })

  con.query("SELECT * FROM allvariables", function(err, result, fields){
    if(err) throw err;
      res.json(result);
      console.log(result);
  })


});

app.post("/update", function(req, res) {
  let newquery = "UPDATE allvariables SET city = '" + req.body.city + "', address = '" + req.body.address + "', housenumber = '" + req.body.housenumber + "', color = '" + req.body.color + "', rooms = '" + req.body.rooms + "' WHERE id = '" + req.body.id + "'";
  console.log(newquery)
  con.query(newquery, function(err, result, fields){
    if(err) throw err;
      res.json("ok");
  });


});

app.post("/delete", function(req, res) {
  let deleteQuery = "delete from allvariables where id = '" + req.body.id + "'";
    con.query(deleteQuery, function(err, result, fields){
      if(err) throw err;
        console.log("Sucessfully deleted!" + req.body.city);
    });

    con.query("SELECT * FROM allvariables", function(err, result, fields){
      if(err) throw err;
        res.json(result);
        console.log(result);
    });
});


app.listen(4000, function(){
  console.log("server is running on port 4000");
})

