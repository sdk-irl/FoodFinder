import React from 'react';
import { InfoWindow } from 'google-maps-react';

function Popup(props) {
    if (!props.showingInfoWindow) {
        return null;
    };
    
    return(
        <InfoWindow
            
            >
            <>
                <h1>Placeholder for place name</h1>
            </>
        </InfoWindow>
    );
}

export default Popup;