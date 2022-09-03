import React, {Component} from "react"
import './app.scss';
import axios from "axios";
import OneComp from "./OneComp";

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
	this.addNew = this.addNew.bind(this);
}


componentDidMount(){
	const url = 'http://localhost:4000/allvars';

	axios.get(url)
		.then(response => response.data)
		.then((data) => {
			console.log(data)
			this.setState({variables: data})
		})
}

addNew(){
	let tempArr = this.state.variables;
	let newObj = {city: "write city", address: "write address", housenumber: "number", color: "color", rooms: "rooms", image: "imgs"}
	tempArr.push(newObj)
	this.setState({variables: tempArr})
	console.log(this.state.variables)
}

render(){
	
	const varsList = this.state.variables.map((result) => (
		<OneComp result = {result} key = {result.housenumber}/>
	))
	
	return(
		<div className = "main">
			
				<p> Here you can see all variables from the database </p>
				

					
					{varsList}
				
					<button id="addItem" onClick={this.addNew}>
						Add new item
					</button>
				
			
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
