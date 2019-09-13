import React, { useState, useEffect } from 'react';
// bootstrapped this app with google-maps-react and now importing necessary items from this API
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Popup from './Popup';
//import { statement } from '@babel/template';
//import OfflineMapContainer from "./OfflineMapContainer";
import API_KEY from './googleApiKey';

//const FourSquare_CLIENT_ID = "C32IZHQ03NWJ15NO234FQVKVI1EH3BQMURKIWGMW0NM1NG3M";
//const FourSquare_SECRET = "1VASBI51LWX20U22VLZBADELCAQBW2QGGE4RU1SNOSBKHPEQ";
// Set FourSquare version to date of writing. Update every couple of months to ensure latest version
//const FourSquare_VERSION = "20190902";
const MAP_CENTER = {
    lat: 40.117243,
    lng: -88.240827
};

function MapContainer(props) {

    const [ map, setMap ] = useState(null);;
    const [ selectedMarker, setSelectedMarker ] = useState(null);

  //callback function for when you close the info window
  //props.locations

    useEffect(() =>{

    });

    // When the map is loaded, set the map state and reset the markers
    function onMapReady(_, m) {
        setMap(m);
        // resetMarkers(props.locations);
    }

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
                    key={index}
                    title={location.name}
                    id={index}
                    position={location.pos}
                    animation={props.google.maps.Animation.DROP}
                    bestKnownFor={location.bestKnownFor}
                ></Marker>
            )}
            <Popup
                showingInfoWindow={ selectedMarker!==null }
            ></Popup>
        </Map>
    );
}

export default GoogleApiWrapper({
    apiKey: API_KEY
})(MapContainer);