import React, {Component} from "react"
import './app.scss';
import axios from "axios";
import OneComp from "./OneComp";
import FormDialog from "./BasicModal"

import { BrowserRouter as Router, Route } from "react-router-dom";

import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';


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
	const url = 'http://localhost:4000/allvars';

	axios.get(url)
		.then(response => response.data)
		.then((data) => {
			console.log(data)
			this.setState({variables: data})
		})
}

// ************************************ THIS CODE TRIES TO SAVE A NEW VARIABLE TO SERVER ***********
savetoServer(data){
	let tempArr = this.state.variables;
	tempArr.push(data);
	this.setState({variables: tempArr})
	//console.log(data)
}

// ************************************ THIS CODE SAVES CHANGES TO SERVER ***********
saveChanges(changes){
	const url = 'http://localhost:4000/savevar';

	axios.post(url, this.state.variables)
		.then(response => response.data)
		.then((data) => {
			console.log(data)
			this.setState({variables: data})
		})
	console.log("Trying to Save Changes")
}

render(){
	
	const varsList = this.state.variables.map((result) => (
		<OneComp result = {result} key = {result.housenumber} saveChanges = {this.saveChanges}/>
	))
	
	return(
		<div className = "main">			
				<p> Here you can see all variables from the database </p>
					{varsList}
					<FormDialog saveChild = {this.savetoServer}/>
		</div>
	)
	
}

}

/*
function OneComp(props){
	return (
		
		<div className="single">
			{props.result.city} <br/>
			{props.result.address} <br/>
			{props.result.housenumber} <br/>
			{props.result.color} <br/>
			{props.result.rooms} <br/>
			{props.result.image} <br/>
			<br/>
			<div>
				<button>Edit this</button>
				&nbsp;
				<button>Save changes</button>
			</div>
		</div>
			
	)
} */

export default Home;
