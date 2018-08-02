import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
import './App.css';
import Map from './Map.js';
import Sidebar from './Sidebar.js';

class App extends Component {

// declaring initial state needed for the application
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

// fetches fake users for the app and checks if the arrive
componentDidMount() {
    fetch("https://randomuser.me/api/?results=6")
		.then(res => {
        if(res.ok) {
			return res.json()
        } else {
			throw new Error(res.statusText)
        }
        })
      .then(myJson => {
		this.setState({users: myJson.results})
        })
        .catch(err => {
			this.setState({error: err.toString()})
        })
}	

// gets which marker was clicked in order to handle Animation
getLastMarkerClicked = (marker) => {	
	if (this.state.getLastMarkerClicked !== marker && this.state.lastMarkerClicked){
		this.state.lastMarkerClicked.setAnimation(-1)
	}
	this.setState({lastMarkerClicked: marker})
}

// gets the infowindow so it can be closed when the user searches
getLastOpenedWindow = (infowindow) => {
	infowindow.marker = null
	this.setState({lastOpenedWindow: infowindow})
}

// searches for the appropriate locations in the list
queryUpdate = (query) => {
	
	// updateing the state
    this.setState({query: query})
	this.setState({currentLocations : []})
	
	// clearing lefover animation
	this.state.lastMarkerClicked.setAnimation(-1)
  
    // updating which locations need to be listed
    if (query) {
	    this.state.locations.forEach((ele) => {
			if (ele.title.toLowerCase().includes(query.toLowerCase())) {
			    this.setState((prevState) => ({currentLocations: [...prevState.currentLocations, ele]}))
			}
	    })   
    } else {
	    this.setState({currentLocations : this.state.locations})
	}
	// shutting down that pesky window
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
		{this.state.error ? 
            <div className="map-error">
                <p>An error has occurred loading resources, please try again!</p>
            <div>Error is {this.state.error}</div>
            </div> :	
		    <div className="flex-container">
			    <Sidebar queryUpdate={this.queryUpdate} currentLocations={this.state.currentLocations} users={this.state.users}/>
			    <Map google={this.props.google} currentLocations={this.state.currentLocations} getLastOpenedWindow={this.getLastOpenedWindow} getLastMarkerClicked={this.getLastMarkerClicked} users={this.state.users}/>
		    </div>}
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