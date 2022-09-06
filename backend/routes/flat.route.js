//var http = require('http');
var mysql = require('mysql');
const fs = require('fs');

require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');

router = express.Router();

//	******************************************** MYSQL CONNECTION. GETTING DATA FROM DATABASE ****************************************************
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "variables"

  /*host: "localhost",
  user: "dreamlo1_mec",
  password: "homeautomation",
  database: "dreamlo1_variables"*/
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

function base64_encode(file){
	return fs.readFileSync(file, 'base64');
}


router.get("/", function(req, res) {

  con.query("SELECT * FROM allvariables", function(err, result, fields){
    if(err) throw err;
      res.json(result);
      console.log(result);

  })
  
});

router.post("/savenew", function(req, res) {
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

router.post("/update", function(req, res) {
  let newquery = "UPDATE allvariables SET city = '" + req.body.city + "', address = '" + req.body.address + "', housenumber = '" + req.body.housenumber + "', color = '" + req.body.color + "', rooms = '" + req.body.rooms + "' WHERE id = '" + req.body.id + "'";
  console.log(newquery)
  con.query(newquery, function(err, result, fields){
    if(err) throw err;
      res.json("ok");
  });

});

router.post("/delete", function(req, res) {
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

module.exports = router;
