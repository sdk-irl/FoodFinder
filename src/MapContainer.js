import React, { useState, useEffect } from 'react';
import { Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
//import { statement } from '@babel/template';
//import OfflineMapContainer from "./OfflineMapContainer";

const API_KEY = "AIzaSyAVIlVT1r_WJh4Ru7aIAU8NAd7GPxPtQC8";
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
    const [ markers, setMarkers ] = useState([]);
    const [ selectedMarker, setSelectedMarkers ] = useState (null);
    const [ showingInfoWindow, showHideInfoWindow ] = useState(false);

    //markerProps and selectedMarkerProps

    useEffect(() =>{

    });

    // When the map is loaded, set the map state and reset the markers
    function onMapReady(_, m) {
        setMap(m);
        // resetMarkers(props.locations);
    }

    //showHideInfoWindow = () => {    } This needs to toggle the infowindow and markers

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
            <InfoWindow
                showingInfoWindow={showingInfoWindow}
            >
                <>
                    <h1>Placeholder for place name</h1>
                </>
            </InfoWindow>
        </Map>
    );
}

export default GoogleApiWrapper({
    apiKey: API_KEY
})(MapContainer);