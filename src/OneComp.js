import React, {Component} from "react"
import './app.scss';
import axios from "axios";

import { BrowserRouter as Router, Route } from "react-router-dom";

import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';


//https://www.w3schools.com/js/js_callback.asp


class OneComp extends Component {
	
constructor(props){
	super(props);
	this.state = {
		variables: {},
		isEditing: false,
		editorcancel: "Edit this"
	}
	this.editAll = this.editAll.bind(this);
	this.detectChanges = this.detectChanges.bind(this);
	this.saveChanges = this.saveChanges.bind(this);
}


componentDidMount(){
	this.setState({variables: this.props.result})
	console.log(this.props.result)
}

editAll(){
	this.setState({isEditing: true})
	if(this.state.editorcancel === "Cancel"){
		this.setState({isEditing: false})
		this.setState({editorcancel: "Edit this"})
	}
	this.setState({editorcancel: "Cancel"})
}

detectChanges(val, e){
	console.log(e.target.value)
	let tempObj = JSON.parse(JSON.stringify(this.state.variables));
	tempObj[val] = e.target.value;
	this.setState({variables: tempObj})
	console.log(tempObj);
}

saveChanges(){
	console.log(this.state.variables)
	this.setState({isEditing: false})

	const url = 'http://localhost:4000/savevar';

	axios.post(url, this.state.variables)
		.then(response => response.data)
		.then((data) => {
			console.log(data)
			this.setState({variables: data})
		})
}

render(){
	
	return(
		<div className="single">

			{ this.state.isEditing ? 
				<TextField
				id="standard-helperText"
				defaultValue={this.state.variables.city}
				variant="standard"
				onChange={(e) => {this.detectChanges("city", e)}}
        		/> : this.state.variables.city
			}
			<br/>

			{ this.state.isEditing ? 
				<TextField
				id="standard-helperText"
				defaultValue={this.props.result.address}
				variant="standard"
				onChange={this.detectChanges}
        		/> : this.props.result.address
			}
			<br/>
			 
			{ this.state.isEditing ? 
				<TextField
				id="standard-helperText"
				defaultValue={this.props.result.housenumber}
				variant="standard"
				onChange={this.detectChanges}
        		/> : this.props.result.housenumber
			}
			<br/>
			{ this.state.isEditing ? 
				<TextField
				id="standard-helperText"
				defaultValue={this.props.result.color}
				variant="standard"
				onChange={this.detectChanges}
        		/> : this.props.result.color
			}
			<br/>
			{ this.state.isEditing ? 
				<TextField
				id="standard-helperText"
				defaultValue={this.props.result.rooms}
				variant="standard"
				onChange={this.detectChanges}
        		/> : this.props.result.rooms
			}
			
			<br/>
			{this.props.result.image} <br/>
			
			<br/>
			<div>
				<button onClick={this.editAll}>{this.state.editorcancel}</button>
				&nbsp;
				<button onClick={this.saveChanges}>Save changes</button>
			</div>
		</div>
	)
	
}

}


export default OneComp;
