import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, InfoWindow} from 'react-google-maps';
import { Marker } from 'react-google-maps';

class Map extends Component {

render() {
   const MyGoogleMap = withGoogleMap(props => (
   
      <GoogleMap
        defaultCenter = {{lat: 47.4918275, lng: 19.0392800}}
        defaultZoom = {14}>
	  {this.props.locations.map((location, i) => 
		<Marker key={i} position={{lat: location.location.lat, lng: location.location.lng}}>
			<InfoWindow><h4>{this.props.locations[i].title}</h4></InfoWindow>
		</Marker>)}
      </GoogleMap>
   ));
   return(
      <div className="map">
        <MyGoogleMap
          containerElement={ <div className="map" /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
   );
   }
};
export default Map;