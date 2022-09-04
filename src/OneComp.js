import React, {Component} from "react"
import './app.scss';

import TextField from '@mui/material/TextField';


//https://www.w3schools.com/js/js_callback.asp


class OneComp extends Component {
	
constructor(props){
	super(props);
	this.state = {
		variables: {},
		isEditing: false,
		editorcancel: "Edit this"
	}
	this.editThis = this.editThis.bind(this);
	this.detectChanges = this.detectChanges.bind(this);
	this.saveChangesHere = this.saveChangesHere.bind(this);
	this.deleteThis = this.deleteThis.bind(this);
	this.cancelEditing = this.cancelEditing.bind(this);
}


componentDidMount(){
	this.setState({variables: this.props.result})
	//console.log(this.props.result)
}

editThis(){
	this.setState({isEditing: true})

}

cancelEditing(){
	this.setState({isEditing: false})
}

detectChanges(val, e){
	//console.log(e.target.value)
	let tempObj = JSON.parse(JSON.stringify(this.state.variables));
	tempObj[val] = e.target.value;
	this.setState({variables: tempObj})
	//console.log(tempObj);
}

saveChangesHere(){
	this.setState({isEditing: false});
	this.props.saveChanges(this.state.variables);
}

deleteThis(){
	this.props.deleteVar(this.state.variables);
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
				onChange={(e) => {this.detectChanges("address", e)}}
        		/> : this.props.result.address
			}
			<br/>
			 
			{ this.state.isEditing ? 
				<TextField
				id="standard-helperText"
				defaultValue={this.props.result.housenumber}
				variant="standard"
				onChange={(e) => {this.detectChanges("housenumber", e)}}
        		/> : this.props.result.housenumber
			}
			<br/>
			{ this.state.isEditing ? 
				<TextField
				id="standard-helperText"
				defaultValue={this.props.result.color}
				variant="standard"
				onChange={(e) => {this.detectChanges("color", e)}}
        		/> : this.props.result.color
			}
			<br/>
			{ this.state.isEditing ? 
				<TextField
				id="standard-helperText"
				defaultValue={this.props.result.rooms}
				variant="standard"
				onChange={(e) => {this.detectChanges("rooms", e)}}
        		/> : this.props.result.rooms
			}
			
			<br/>
			{this.props.result.image} <br/>
			
			<br/>
			<div>
				{ this.state.isEditing ? 
				<button onClick={this.cancelEditing}>Cancel</button> : 
				<button onClick={this.editThis}>Edit this</button>
				}
				
				&nbsp;
				<button onClick={this.saveChangesHere}>Save changes</button>
				&nbsp;
				<button onClick={this.deleteThis}>Delete this</button>
			</div>
		</div>
	)
	
}

}


export default OneComp;
