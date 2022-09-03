//var http = require('http');
var mysql = require('mysql');
const fs = require('fs');

require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const router = express.Router();

const app = express();

const PORT = process.env.PORT;

//app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.get("/", function(req, res) {
  var result = "Express.js";
  res.send("Testing the: " + result);
});


app.listen(4000, function(){
  console.log("server is running on port 3000");
})


/*app.post('/', (req, res) => {
	res.send('Hello world')
})*/

//module.exports = app;

/*
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "locations"
});

let places;
let imagesArr = [];

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM places where continent = 'Africa'", function(err, result, fields){
	  if(err) throw err;
	  //console.log(result);
	  places = result;
	  places.forEach((el) => {
		  let newArr = el.images.split(", ");
		  newArr.forEach((item) => {
			  let tempImg = base64_encode(item);
			  
			  imagesArr.push(JSON.stringify({pictures: tempImg}))
		  })
	  })
	  
  })
  console.log("Connected!");
  
});

function base64_encode(file){
	return fs.readFileSync(file, 'base64');
}

http.createServer(function (request, response) {
   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'application/json'});
   
   // Send the response body as "Hello World"
   //var mydata = {continent: "Asia", country: "India"};
   response.end(JSON.stringify(places) + "separatorplace" + JSON.stringify(imagesArr));
   //response.end(JSON.stringify(places));
}).listen(8081);


// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
*/


