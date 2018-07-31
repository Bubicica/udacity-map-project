import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
import logo from './logo.svg';
import './App.css';
import Map from './Map.js';
class App extends Component {

// define initial state
state = {
	locations: [
		{title:'Indigo', location: {lat: 47.4918275, lng: 19.0391501}},
		{title:'Rapaz', location: {lat: 47.4977522, lng: 19.070250999999985}},
		{title:'Bors', location: {lat: 47.4967267, lng: 19.063548699999956}}
		],
	markers: [],

	query: ''
}



// a function to populate the infoWindows
addInfoToWindow = (event) =>{
	console.log(event.target)
}



	
  render() {
    return (
	<div className="App">	
		<header>
			<h1>Budapest Eats</h1>
		</header>
		<div className="flex-container">
			<aside id="search-list">
				<div id="search">
					<input type="text" placeholder="Search for a restaurant"/>
				</div>
				<div id="list">
					<ol>
						<li>Rapaz</li>
						<li>Bors</li>
						<li>Indigo</li>
					</ol>
				</div>		
			</aside>
			<Map locations={this.state.locations} infoWindow={this.state.myInfoWindow} markers={this.state.markers}/>
		</div>
		<footer>
			<h3>© Bubicica designs and webz</h3>
		</footer>
    </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAhr6d33cD2nT-d28dVYcyglYEc-YRCzls'
})(App)