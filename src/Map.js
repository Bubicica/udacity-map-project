import React, { Component } from 'react';

class Map extends Component {

// define initial state
state = {
    markers: [],
    infowindow: new this.props.google.maps.InfoWindow(),
    mapRef: React.createRef(),
    errorWithMap: ''
}

// load dat map and activate sidebar functions
componentDidMount() {
    this.loadMap()
    this.onLocationClick()
}

// set marker visibility whenever there is an update
componentDidUpdate(){
    this.state.markers.forEach((marker) => {
        marker.setVisible(false)
        this.props.currentLocations.forEach((location) => {
            if (marker.title.toLowerCase() === location.title.toLowerCase()) {
                marker.setVisible(true)
            }
        })
    })
}

// defines how the map is set up initially and throws errors
loadMap() {
    if (this.props && this.props.google) {
        const node = this.state.mapRef.current
        const mapConfig = {
            center: {lat: 47.498, lng: 19.05455},
            zoom: 12,
        }

        this.map = new this.props.google.maps.Map(node, mapConfig)
        this.addMarkers()
        } else {
	    this.setState({errorWithMap: "Error while loading your map, sorry :("})
        }
    }

// adds Markers to the Map with associated Infowindows
addMarkers = () => {
    this.props.currentLocations.forEach((location, index) => {
        const marker = new this.props.google.maps.Marker({
            position: {lat: location.location.lat, lng: location.location.lng},
            map: this.map,
            title: location.title,
        })
		
        marker.addListener('click', () => {
            this.fillInfoWindow(marker, this.state.infowindow, this.props.users[index])
        })

        this.setState((state) => ({
            markers: [...state.markers, marker]
        }))
    })
}

// Fill up the infowindows with useful information - and load userdata async
fillInfoWindow = (marker, infowindow, user) => {
    if (infowindow.marker !== marker) {
        infowindow.marker = marker
	
	// create the content here if there are users in the props
	if (this.props.users){
		infowindow.setContent("<h4>" + marker.title + "</h4><p><img src='" + user.picture.thumbnail + "' alt='user profile picture' class='user-thumbnail'/></p><p class='like-text'>" + user.name.first[0].toUpperCase() + user.name.first.substring(1) + " " + user.name.last[0].toUpperCase() + user.name.last.substring(1) +" recently liked this place!</p>")	
	}
    
	// pop-open that window
    infowindow.open(this.map, marker)
	
    // Getting rid of the marker property of the infowindow
    infowindow.addListener('closeclick', function () {
        infowindow.marker = null
    })
	
	// updating the state with the current infowindow
    this.props.getLastOpenedWindow(infowindow)

    // animating markers
    this.props.getLastMarkerClicked(marker)
    marker.setAnimation(this.props.google.maps.Animation.BOUNCE)
  }
}

// pop-up appropriate infowindow if user clicks on the list
onLocationClick = () => {
    const that = this
    const displayInfowindow = (event) => {
        const markerInd = this.state.markers.findIndex(marker => marker.title.toLowerCase() === event.target.innerText.toLowerCase())
	    
		// feed info to infowindow if user is availble
	    if (this.props.users){
		that.fillInfoWindow(this.state.markers[markerInd], this.state.infowindow, this.props.users[markerInd])  
	    }
    }
	
	// get to know which LI was clicked
    document.querySelector('.location-list').addEventListener('click', function (event) {
        if (event.target && event.target.nodeName === "LI") {
            displayInfowindow(event)
        }
    })
}

render() {
   return(
      <div className="map" role="application" ref={this.state.mapRef}>
        {this.state.errorWithMap && <div className="map-error">{this.state.errorWithMap}</div>}
      </div>
   );
   }
};

export default Map;