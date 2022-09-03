import React, {Component} from "react"
import logo from './logo.svg';
import './App.css';
import {Map, GoogleApiWrapper, Marker} from "google-maps-react"

import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';



// PAGES
import Home from "./HomePage";

class App extends Component {

render () {
	
	return (
			<div className="main">
				<Home />
			</div>
		);
}

}

export default App;

