import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
import './App.css';
import Map from './Map.js';
import Sidebar from './Sidebar.js';

class App extends Component {

// declaring initial state needed for the application
state = {
	locations: [
    {venueId: '52449b5a04935117b00eb0f8', title:'Padron', location: {lat: 47.49203639999999, lng: 19.067763300000024}},
	{venueId: '4c72c7ed4bc4236a4330cc7a', title:'Halászbástya Restaurant', location: {lat: 47.502845, lng: 19.0351046}},
	{venueId: '501183cfe4b035d9f36407b7', title:'Bors Gasztrobár', location: {lat: 47.4967267, lng: 19.063548699999956}},
	{venueId: '4bcb05fd0687ef3bede2dccc', title:'Taverna Dionysos', location: {lat: 47.488574, lng: 19.054928}},
	{venueId: '50b4eeeae4b03dbff5e89966', title:'The Donut Library', location: {lat: 47.516483, lng: 19.0501}},
	{venueId: '4d6ea7152427224ba39ad04d', title:'Borkonyha', location: {lat: 47.499583, lng: 19.052557}}
	],
	currentLocations: [
    {venueId: '52449b5a04935117b00eb0f8', title:'Padron', location: {lat: 47.49203639999999, lng: 19.067763300000024}},
	{venueId: '4c72c7ed4bc4236a4330cc7a', title:'Halászbástya Restaurant', location: {lat: 47.502845, lng: 19.0351046}},
	{venueId: '501183cfe4b035d9f36407b7', title:'Bors Gasztrobár', location: {lat: 47.4967267, lng: 19.063548699999956}},
	{venueId: '4bcb05fd0687ef3bede2dccc', title:'Taverna Dionysos', location: {lat: 47.488574, lng: 19.054928}},
	{venueId: '50b4eeeae4b03dbff5e89966', title:'The Donut Library', location: {lat: 47.516483, lng: 19.0501}},
	{venueId: '4d6ea7152427224ba39ad04d', title:'Borkonyha', location: {lat: 47.499583, lng: 19.052557}}
	],
	query: '',
	lastOpenedWindow: '',
	lastMarkerClicked: '',
	client_id: 'PMBGA0SN2DWWN1ZIN4A5YCJQCU4R3YIBB00RTJPS2LVW5KWS',
	client_secret: 'U1LG4SLYLXDLNRMZYR1DBRJYVZMBUIAJESY2PVQDPKPL5AQM',
	venueInfo: []
}

// fetches fake users and location info from Foursquare for the app and checks if the arrive
componentDidMount() {
	// fetching info from Foursquare
	this.state.locations.forEach((location) => {
		fetch("https://api.foursquare.com/v2/venues/"+ location.venueId +"?client_id="+ this.state.client_id +"&client_secret="+ this.state.client_secret +"&v=20180323")
		.then(res => {
        if(res.ok) {
			return res.json()
        } else {
			throw new Error(res.statusText)
        }
        })
      .then(myJson => {
		 this.setState((prevState) => ({venueInfo: [...prevState.venueInfo, myJson.response]}))
        })
        .catch(err => {
			this.setState({error: err.toString()})
	    })
	})

	// fetching info from randomuser.me
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
			    <Map google={this.props.google} currentLocations={this.state.currentLocations} getLastOpenedWindow={this.getLastOpenedWindow} getLastMarkerClicked={this.getLastMarkerClicked} users={this.state.users} venueInfo={this.state.venueInfo}/>
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