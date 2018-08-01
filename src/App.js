import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
import './App.css';
import Map from './Map.js';

class App extends Component {
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
			<Map google={this.props.google}/>
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