import React, { useState } from 'react';
import './App.css';
import MapContainer from './MapContainer';
import LocationsDrawer from './LocationsDrawer';

function App() {

  const [ allRestaurants, setAllRestaurants ] = useState(null);
  const [ filteredRestaurants, setfilteredRestaurants ] = useState(null);

  //if filteredRestaurants === null (fetch and set)


  return (
    <div className="App">
      <h1 style={{width: '100%',textAlign: 'center'}}>
        Champaign FoodFinder
      </h1>
      <MapContainer 
        locations={filteredRestaurants===null?allRestaurants:filteredRestaurants}
      />
      <LocationsDrawer 
        locations={allRestaurants}
      />

    </div>
  );
}

export default App;
