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
    };
    function onMarkerClick(marker) {
        console.info(marker);
        // Defines the FourSquare URL including the client ID, Secret, Verion number, two lat/long search parameters, and a limit on number of returns
        const FourSquareUrl_Search = `https://api.foursquare.com/v2/venues/search?client_id=${FourSquare_CLIENT_ID}&client_secret=${FourSquare_SECRET}&v=${FourSquare_VERSION}&radius=250&ll=${marker.position.lat},${marker.position.lng}&limit=10`;
        console.log(FourSquareUrl_Search);
        // Variable declaring a new request that uses the FourSquare URL as a parameter
        const request = new Request(FourSquareUrl_Search, {
            method: "GET"
        });

        fetch(request) 
        .then(response => {
            if(!response.ok) {
                throw new Error('Response not okay');
            }
            console.log('Response', response.json());
        })
         .catch(error => console.error('Error:', error));
        // close previous info windows before opening the next
        // const selectedMarker = setSelectedMarker(selectedMarker === marker);
        // return selectedMarker;
    };



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