import React, { useState } from 'react';
import './App.css';
import allRestaurants from "./data/locations.json";
import MapContainer from './MapContainer';
import LocationsDrawer from './LocationsDrawer';

function App() {

  const [ showingRestaurants, setShowingRestaurants ] = useState(allRestaurants);




  return (
    <div className="App">
      <h1 style={{width: '100%',textAlign: 'center'}}>
        Champaign FoodFinder
      </h1>
      <MapContainer 
        locations={showingRestaurants}
      />
      <LocationsDrawer 
        locations={showingRestaurants}
      />

    </div>
  );
}

export default App;
