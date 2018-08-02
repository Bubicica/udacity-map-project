import React, { Component } from 'react';

class Map extends Component {

// define initial state
state = {
  markers: [],
  infowindow: new this.props.google.maps.InfoWindow(),
  mapRef: React.createRef()
}

componentDidMount() {
  this.loadMap()
  this.onLocationClick()
}

componentDidUpdate(){
  this.state.markers.forEach((marker) => {
    marker.setVisible(false)
    this.props.currentLocations.forEach((location) => {
      if (marker.title.toLowerCase() === location.title.toLowerCase()) {
        marker.setVisible(true)
      }
    }
  )
  })
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
  this.props.currentLocations.forEach((location, index) => {
    const marker = new this.props.google.maps.Marker({
      position: {lat: location.location.lat, lng: location.location.lng},
      map: this.map,
      title: location.title,
    })

   marker.addListener('click', () => {
      this.populateInfoWindow(marker, this.state.infowindow, this.props.users[index])
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
    this.props.getLastOpenedWindow(infowindow)

    // animating markers
    this.props.getLastMarkerClicked(marker)
    marker.setAnimation(this.props.google.maps.Animation.BOUNCE)
    
  }
}

onLocationClick = () => {
    const that = this
    const displayInfowindow = (event) => {
      const markerInd = this.state.markers.findIndex(marker => marker.title.toLowerCase() === event.target.innerText.toLowerCase())
      that.populateInfoWindow(this.state.markers[markerInd], this.state.infowindow, this.props.users[markerInd])
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