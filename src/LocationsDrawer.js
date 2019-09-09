import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';

export default function LocationsDrawer() {
    const [ drawerOpen, setDrawerOpen ] = useState(true);

    function toggleDrawerClick() {
        setDrawerOpen( x => !x );
    }

    return (
        <>
            {drawerOpen && (
                <Drawer
                    width={200}
                >
                    <input 
                        type='button' 
                        onClick={toggleDrawerClick}
                    />

                </Drawer>
            )}
            
        </>
    );
}