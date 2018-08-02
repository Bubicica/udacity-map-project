import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
import './App.css';
import Map from './Map.js';
import Sidebar from './Sidebar.js';

class App extends Component {
	
state = {
	locations: [
	{title:'Indigo', location: {lat: 47.4918275, lng: 19.0391501}},
	{title:'Rapaz', location: {lat: 47.4977522, lng: 19.070250999999985}},
	{title:'Bors Gastrobar', location: {lat: 47.4967267, lng: 19.063548699999956}},
	{title:'Buda Gourmet Bistro', location: {lat: 47.528095, lng: 19.037538}},
	{title:'Biwako Ramen', location: {lat: 47.507306, lng: 19.062940}},
	{title:'Hongkong Restaurant', location: {lat: 47.534545, lng: 19.082193}}
	],
	currentLocations: [
		{title:'Indigo', location: {lat: 47.4918275, lng: 19.0391501}},
		{title:'Rapaz', location: {lat: 47.4977522, lng: 19.070250999999985}},
		{title:'Bors Gastrobar', location: {lat: 47.4967267, lng: 19.063548699999956}},
		{title:'Buda Gourmet Bistro', location: {lat: 47.528095, lng: 19.037538}},
		{title:'Biwako Ramen', location: {lat: 47.507306, lng: 19.062940}},
		{title:'Hongkong Restaurant', location: {lat: 47.534545, lng: 19.082193}}
	],
	query: '',
	lastOpenedWindow: '',
	lastMarkerClicked: ''
}

componentDidMount() {
  fetch("https://randomuser.me/api/?results=6").then(res => res.json()).then(myJson => this.setState({users: myJson.results}))
}

getLastMarkerClicked = (marker) => {	
	if (this.state.getLastMarkerClicked !== marker && this.state.lastMarkerClicked){
		this.state.lastMarkerClicked.setAnimation(-1)
	}
	this.setState({lastMarkerClicked: marker})
}

getLastOpenedWindow = (infowindow) => {
infowindow.marker = null
this.setState({lastOpenedWindow: infowindow})
}

queryUpdate = (query) => {
  this.setState({query: query})
	this.setState({currentLocations : []})
	this.state.lastMarkerClicked.setAnimation(-1)
  
   if (query) {
	    this.state.locations.forEach((ele) => {
			if (ele.title.toLowerCase().includes(query.toLowerCase())) {
			  this.setState((prevState) => ({currentLocations: [...prevState.currentLocations, ele]}))
			}
	})   
   } else {
	    this.setState({currentLocations : this.state.locations})
	 }
	 if (this.state.lastOpenedWindow !== ''){
		this.state.lastOpenedWindow.close()
	 }
}
	
render() {
    return (
	<div className="App">	
		<header>
			<h1>Budapest Eats</h1>
		</header>

		<div className="flex-container">
			<Sidebar queryUpdate={this.queryUpdate} currentLocations={this.state.currentLocations} users={this.state.users}/>
			<Map google={this.props.google} currentLocations={this.state.currentLocations}
			getLastOpenedWindow={this.getLastOpenedWindow} getLastMarkerClicked={this.getLastMarkerClicked} users={this.state.users}/>
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