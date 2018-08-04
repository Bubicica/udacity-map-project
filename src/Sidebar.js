import React, { Component } from 'react';

class Sidebar extends Component {

    render() {
        return(
            <aside id="search-list">
            <div id="search">
                <input aria-label="restaurant search" type="text" placeholder="Search for a restaurant" onChange={(event) => this.props.queryUpdate(event.target.value)}/>
            </div>
            <div id="list">
            <ol className="location-list" role="list">
                {this.props.currentLocations.map((location, i) => <li key={i} tabIndex="0">{location.title}</li>)}
            </ol>
        </div>		
    </aside>
        );
    }   
};
export default Sidebar;