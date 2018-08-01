import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
import './App.css';
import Map from './Map.js';

class App extends Component {
	
state = {
	query: '',
	places: ["Rapaz", "Bors Gastrobar", "Indigo", "Buda Gourmet Bistro", "Biwako Ramen", "Hongkong Restaurant"],
	currentPlaces: ["Rapaz", "Bors Gastrobar", "Indigo", "Buda Gourmet Bistro", "Biwako Ramen", "Hongkong Restaurant"]
}


queryUpdate = (query) => {
  this.setState({query: query})
  this.setState({currentPlaces : []})
  
   if (query) {
	    this.state.places.forEach((ele, ind) => {
			if (ele.toLowerCase().includes(query.toLowerCase())) {
			  this.setState((prevState) => ({currentPlaces: [...prevState.currentPlaces, ele]}))
			}
	})   
   } else {
	    this.setState({currentPlaces : this.state.places})
   }
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
					<input type="text" placeholder="Search for a restaurant" onChange={(event) => this.queryUpdate(event.target.value)}/>
				</div>
				<div id="list">
					<ol className="location-list">
					{this.state.currentPlaces.map((place, i) => <li key={i}>{place}</li>)}
					</ol>
				</div>		
			</aside>
			<Map google={this.props.google} currentPlaces={this.state.currentPlaces}/>
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