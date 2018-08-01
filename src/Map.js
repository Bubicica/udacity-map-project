import React, { Component } from 'react';

class Map extends Component {

// define initial state
state = {
  locations: [
	{title:'Indigo', location: {lat: 47.4918275, lng: 19.0391501}},
	{title:'Rapaz', location: {lat: 47.4977522, lng: 19.070250999999985}},
	{title:'Bors Gastrobar', location: {lat: 47.4967267, lng: 19.063548699999956}},
	{title:'Buda Gourmet Bistro', location: {lat: 47.528095, lng: 19.037538}},
	{title:'Biwako Ramen', location: {lat: 47.507306, lng: 19.062940}},
	{title:'Hongkong Restaurant', location: {lat: 47.534545, lng: 19.082193}}
	],
  markers: [],
  infowindow: new this.props.google.maps.InfoWindow(),
  mapRef: React.createRef()
}

componentDidMount() {
  this.loadMap()
  this.onLocationClick()
  fetch("https://randomuser.me/api/?results=6").then(res => res.json()).then(myJson => this.setState({users: myJson.results}))
}

loadMap() {
  if (this.props && this.props.google) {
    const node = this.state.mapRef.current

    const mapConfig = {
      center: {lat: 47.498, lng: 19.05455},
      zoom: 12,
    }

    this.map = new this.props.google.maps.Map(node, mapConfig)
    this.addMarkers()
  }
}

addMarkers = () => {
  this.state.locations.forEach((location, index) => {
    const marker = new this.props.google.maps.Marker({
      position: {lat: location.location.lat, lng: location.location.lng},
      map: this.map,
      title: location.title,
    })

   marker.addListener('click', () => {
      this.populateInfoWindow(marker, this.state.infowindow, this.state.users[index])
    })

    this.setState((state) => ({
      markers: [...state.markers, marker]
    }))
  })
}

populateInfoWindow = (marker, infowindow, user) => {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker !== marker) {
    infowindow.marker = marker
    infowindow.setContent("<h4>" + marker.title + "</h4><p><img src='" + user.picture.thumbnail + "' alt='user profile picture' class='user-thumbnail'/></p><p class='like-text'>" + user.name.first[0].toUpperCase() + user.name.first.substring(1) + " " + user.name.last[0].toUpperCase() + user.name.last.substring(1) +" recently liked this place!</p>")
    infowindow.open(this.map, marker)
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function () {
      infowindow.marker = null
    })
  }
}

onLocationClick = () => {
    const that = this

    const displayInfowindow = (event) => {
      const markerInd = this.state.markers.findIndex(marker => marker.title.toLowerCase() === event.target.innerText.toLowerCase())
      that.populateInfoWindow(this.state.markers[markerInd], this.state.infowindow, this.state.users[markerInd])
    }
	
    document.querySelector('.location-list').addEventListener('click', function (event) {
      if (event.target && event.target.nodeName === "LI") {
        displayInfowindow(event)
      }
    })
  }


render() {
   return(
      <div className="map" role="application" ref={this.state.mapRef}>

      </div>
   );
   }
};
export default Map;