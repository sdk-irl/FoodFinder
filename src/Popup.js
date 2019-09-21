import React from 'react';
import { InfoWindow } from 'google-maps-react';

function Popup(props) {
    
    return(
        <InfoWindow
            visible={props.showingInfoWindow}
            >
            <>
                <h1>Placeholder for place name</h1>
            </>
        </InfoWindow>
    );
}

export default Popup;