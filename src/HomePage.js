import React, {Component} from "react"
import './app.scss';
import axios from "axios";
import OneComp from "./OneComp";
import FormDialog from "./BasicModal"

import TextField from '@mui/material/TextField';


//https://www.w3schools.com/js/js_callback.asp


class Home extends Component {
	
constructor(props){
	super(props);
	this.state = {
		variables: []
	}
	this.savetoServer = this.savetoServer.bind(this);
	this.saveChanges = this.saveChanges.bind(this);
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
			}
		})
	
}

deleteVar(variable){
	const url = 'http://localhost:4000/delete';

	axios.post(url, variable)
		.then(response => response.data)
		.then((data) => {
			window.location.reload();
		})
}

render(){
	
	let varsList = this.state.variables.map((result) => (
		<OneComp result = {result} key = {result.housenumber} saveChanges = {this.saveChanges} deleteVar = {this.deleteVar} />
	))
	
	return(
		<div className="secondary">
				<h2 className="headertxt"> Here you can see all variables from the database and their properties </h2>
					{varsList}
					<FormDialog saveChild = {this.savetoServer}/>
		</div>
	)
	
}

}


export default Home;
