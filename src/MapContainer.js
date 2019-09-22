import React, { useState, useEffect } from 'react';
// bootstrapped this app with google-maps-react and now importing necessary items from this API
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Popup from './Popup';
//import { statement } from '@babel/template';
//import OfflineMapContainer from "./OfflineMapContainer";
import { API_KEY, FourSquare_CLIENT_ID, FourSquare_SECRET, FourSquare_VERSION } from './apiKeys';

function MapContainer(props) {
    const MAP_CENTER = {
        lat: 40.117243,
        lng: -88.240827
    };
    const [ map, setMap ] = useState(null);;
    const [ selectedMarker, setSelectedMarker ] = useState(null);


    // When the map is loaded, set the map state and reset the markers
    function onMapReady(_, m) {
        setMap(m);
        // resetMarkers(props.locations);
    }
    function onMarkerClick(marker) {
        // Defines the FourSquare URL including the client ID, Secret, Verion number, two lat/long search parameters, and a limit on number of returns
        const fourSquareMatches = getFourSquareData(marker);
        // close previous info windows before opening the next
        // const selectedMarker = setSelectedMarker(selectedMarker === marker);
        // return selectedMarker;
    }
    function findBusinessMatch(marker, fsVenues) {
        let businessMatch = fsVenues.response.venues.filter(
            venue => 
                venue.name.includes(marker.title) ||
                marker.title.includes(venue.name)
        )
        if (!businessMatch.length === 1) throw new Error('Business match failed');
        return businessMatch[0];
    }
    function getFourSquareData(marker) {
        const FourSquareUrl_Search = `https://api.foursquare.com/v2/venues/search?client_id=${FourSquare_CLIENT_ID}&client_secret=${FourSquare_SECRET}&v=${FourSquare_VERSION}&radius=250&ll=${marker.position.lat},${marker.position.lng}&limit=10`;
        // Variable declaring a new request that uses the FourSquare URL as a parameter
        const r = new Request(FourSquareUrl_Search, {
            method: "GET"
        });
        fetch(r) 
        .then(r => {
            if(!r.ok) {
                throw new Error('Response not okay');
            }
            return r.json();
        })
        .then(r => {
            const restaurant = findBusinessMatch(marker,r);
            const venueId = restaurant.id;
            const url = `https://api.foursquare.com/v2/venues/${venueId}/hours?client_id=${FourSquare_CLIENT_ID}&client_secret=${FourSquare_SECRET}&v=${FourSquare_VERSION}`;
            const req = new Request(url, {
                method: 'GET'
            });
            return fetch(req);
        })
        .then(r => {
            if (!r.ok) {
                throw new Error('Venue response not okay');
            }
            return r.json();
        })
        .catch(error => console.error('Error:', error));
    }


//callback function for when you close the info window
//props.locations

    // useEffect(() =>{
    // });

    //showHideInfoWindow = () => {    } This needs to toggle the infowindow and markers
    const showHideInfoWindow = Function.prototype;

    return (
        <Map
            role='application'
            aria-label='map'
            tabIndex='0'
            google={props.google} 
            zoom={16}
            initialCenter={MAP_CENTER}
            onReady={onMapReady}
            onClick={showHideInfoWindow}
        >
            {props.locations.map((location, index) => 
                <Marker
                    onClick={onMarkerClick}
                    key={index}
                    title={location.name}
                    id={index}
                    position={location.pos}
                    animation={props.google.maps.Animation.DROP}
                    bestKnownFor={location.bestKnownFor}
                ></Marker>
            )}
            <Popup
                showingInfoWindow={selectedMarker!==null}
            ></Popup>
        </Map>
    );
}

export default GoogleApiWrapper({
    apiKey: API_KEY
})(MapContainer);