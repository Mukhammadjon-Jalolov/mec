import React, {Component} from "react"
import './app.scss';
import axios from "axios";
import OneComp from "./OneComp";
import FormDialog from "./BasicModal"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { saveAs } from 'file-saver';

//https://www.w3schools.com/js/js_callback.asp


class Home extends Component {
	
constructor(props){
	super(props);
	this.state = {
		variables: []
	}
	this.savetoServer = this.savetoServer.bind(this);
	this.saveChanges = this.saveChanges.bind(this);
	this.downloadtoC = this.downloadtoC.bind(this);
}

// ************************************ HERE WE GET ALL EXISTING VARIABLES FROM THE SERVER
componentDidMount(){

	const url = 'http://localhost:4000/getall';

	axios.get(url)
		.then(response => response.data)
		.then((data) => {
			console.log(data)
			this.setState({variables: data})
		})
}

// ************************************ THIS CODE TRIES TO SAVE A NEW VARIABLE TO SERVER ***********
savetoServer(newvariable){
	//let tempArr = this.state.variables;
	//tempArr.push(data);
	//this.setState({variables: tempArr})
	//console.log(newvariable)

	
	const url = 'http://localhost:4000/savenew';

	axios.post(url, newvariable)
		.then(response => response.data)
		.then((data) => {
			console.log(data)
			this.setState({variables: data})
		})
}

// ************************************ THIS CODE SAVES CHANGES TO SERVER ***********
saveChanges(changes){
	const url = 'http://localhost:4000/update';

	console.log(changes)
	axios.post(url, changes)
		.then(response => response.data)
		.then((data) => {
			if(data === "ok"){
				window.location.reload();
				window.alert("Variable updated");
			}
		})
}

deleteVar(variable){
	const url = 'http://localhost:4000/delete';

	axios.post(url, variable)
		.then(response => response.data)
		.then((data) => {
			window.location.reload();
			window.alert("deleted from database");
		})
}

downloadtoC(){
	
	let cformat3 = "{ printf(" + JSON.stringify(this.state.variables) + ") \r\n return 0; \r\n}"
	let cformat = "#include <stdio.h> \r\n int main() \r\n " + cformat3;
	
	let str = "";

	this.state.variables.map((el) => {
		for(let x in el){
			if(typeof(el[x]) === "number"){
				str += "int " + x + " = " + el[x] + "\r\n";
			} else if(typeof(el[x]) === "string"){
				str += "char " + x + "[] = " + el[x] + "\r\n";
			} else if(typeof(el[x]) === "object"){
				str += "char " + x + "[] = " + el[x] + "\r\n";
			}
		}
	})

	let explain = "\r\nBelow is the C code for creating an array of objects for this site (I guess this is correct as expected in the task) \r\n \r\n \r\n";
	let cClass = "#include<iostream>\r\n using namespace std; \r\n \r\n class Apartments \r\n {\r\n  char city[]; \r\n  char address[]; \r\n  int housenumber; \r\n  char color[]; \r\n  int rooms; \r\n  int id; \r\n }; \r\n \r\n";
	let cObject = "int main(){\r\n Apartments aprt["+ this.state.variables.length +"]; \r\n int n = "+ this.state.variables.length +", i; \r\n for(i = 0; i < n; i++) {\r\n	aprt[i].getdata(); \r\n }\r\n return 0; \r\n};\r\n";
	let description = "\r\n \r\nBelow is the example of data types in C for this task \r\n\r\n";
	let cArray = explain + cClass + cObject + description + str;

	
	//let stringFormat = JSON.stringify(this.state.variables);
	//let blob = new Blob([cArray], { type: "text/plain; charset=utf-8" })
	//saveAs(blob, "C code.txt");
	console.log(cArray);
}

render(){
	
	let varsList = this.state.variables.map((result) => (
		<OneComp result = {result} key = {result.id} saveChanges = {this.saveChanges} deleteVar = {this.deleteVar} />
	))
	
	return(
		<div className="secondary">
				<h2 className="headertxt"> Here you can see all variables (apartments information) from the database and their properties </h2>
					{varsList}
					<FormDialog saveChild = {this.savetoServer}/>
					&nbsp;
					<Button variant="contained" color = "info" onClick={this.downloadtoC}>Download as C code</Button>
		</div>
	)
	
}

}


export default Home;
