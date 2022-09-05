import React, {Component} from "react"
//import './app.scss';
import './App.css';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CirclePicker } from 'react-color';


//https://www.w3schools.com/js/js_callback.asp


class OneComp extends Component {
	
constructor(props){
	super(props);
	this.state = {
		variables: {},
		isEditing: false,
		editorcancel: "Edit this",
		backgrcolorStyle: {},
		textColorStyle: {},
		temporaryColor: {}
	}

	this.editThis = this.editThis.bind(this);
	this.detectChanges = this.detectChanges.bind(this);
	this.saveChangesHere = this.saveChangesHere.bind(this);
	this.deleteThis = this.deleteThis.bind(this);
	this.cancelEditing = this.cancelEditing.bind(this);
}

componentDidMount(){
	this.setState({variables: this.props.result});
	this.setState({backgrcolorStyle: {backgroundColor: this.props.result.color} });
	this.setState({textColorStyle: {color: this.props.result.color} })
}

editThis(){
	this.setState({isEditing: true})
}

cancelEditing(){
	this.setState({isEditing: false})
	this.setState({backgrcolorStyle: {backgroundColor: this.props.result.color} });
	this.setState({variables: this.props.result})
}

detectChanges(val, e){
	let tempObj = JSON.parse(JSON.stringify(this.state.variables));
	
	if(val === "color"){
		tempObj.color = e.hex
		this.setState({backgrcolorStyle: {backgroundColor: e.hex} });
	} else {
		tempObj[val] = e.target.value
	}
	
	this.setState({variables: tempObj})
}

saveChangesHere(){
	this.setState({isEditing: false});
	this.props.saveChanges(this.state.variables);
	console.log(this.state.variables);
}

deleteThis(){
	this.props.deleteVar(this.state.variables);
}

render(){
	
	return(
		<div className="single" style = {this.state.backgrcolorStyle} >

			<div className="onerow">
				<div className="leftlabel">
					City:
				</div>
				<div className="rightside">
					{ this.state.isEditing ? 
					<TextField
					id="standard-helperText"
					defaultValue={this.state.variables.city}
					variant="standard"
					onChange={(e) => {this.detectChanges("city", e)}}
					/> : this.state.variables.city
					}
				</div>
			</div>
			




			<div className="onerow">
				<div className="leftlabel">
					Address:
				</div>
				<div className="rightside">
					{ this.state.isEditing ? 
					<TextField
					id="standard-helperText"
					defaultValue={this.props.result.address}
					variant="standard"
					onChange={(e) => {this.detectChanges("address", e)}}
					/> : this.props.result.address
					}
				</div>
			</div>
			
			

			<div className="onerow">
				<div className="leftlabel">
					House number:
				</div>
				<div className="rightside">
					{ this.state.isEditing ? 
					<TextField
					id="standard-helperText"
					defaultValue={this.props.result.housenumber}
					variant="standard"
					onChange={(e) => {this.detectChanges("housenumber", e)}}
					/> : this.props.result.housenumber
					}
				</div>
			</div>
			
			
			{ this.state.isEditing ? 
				<div className="paletteContainer"> <CirclePicker onChangeComplete={(e) => {this.detectChanges("color", e)}}/> </div> :
				<div className="pickColor" style = {this.state.textColorStyle}> Current color </div>
			}
			

			<div className="onerow">
				<div className="leftlabel">
					Rooms:
				</div>
				<div className="rightside">
					{ this.state.isEditing ? 
					<TextField
					id="standard-helperText"
					defaultValue={this.props.result.rooms}
					variant="standard"
					onChange={(e) => {this.detectChanges("rooms", e)}}
					/> : this.props.result.rooms
					}
				</div>
			</div>
			
			{this.props.result.image} 
			
			<br/>
			
			<div>
				{ this.state.isEditing ? 
				<Button variant="contained" color = "info" onClick={this.cancelEditing}>Cancel</Button> : 
				<Button variant="contained" color = "info" onClick={this.editThis}>Edit this</Button>
				}
				
				&nbsp;

				{ this.state.isEditing ?
				<Button variant="contained" color = "success" onClick={this.saveChangesHere}>Save changes</Button> :
				""
				}
				
				&nbsp;
				<Button variant="outlined" color = "warning" onClick={this.deleteThis}>Delete this</Button>
			</div>
		</div>
	)
	
}

}


export default OneComp;
