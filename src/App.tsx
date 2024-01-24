import "./App.css";
import OurMap from "./components/OurMap";
import { IOurMapProps } from "./components/OurMap/OurMap";
import React from "react";

const DEFAULT_PROPS: IOurMapProps = {
  latitude: 39.8283,
  longitude: -98.5795,
  zoom: 3.6,
  showMarker: false,
};

const SPECIFIC_PROPS: IOurMapProps = {
  latitude: 40.2624713,
  longitude: -75.2595727,
  zoom: 13,
  showMarker: true,
};

const possibleMapStates = [DEFAULT_PROPS, SPECIFIC_PROPS];

function App() {
  const [mapStateIndex, setMapStateIndex] = React.useState<number>(0);
  const handleClick = () =>
    setMapStateIndex((mapStateIndex + 1) % possibleMapStates.length);
  return (
    <>
      <h4>Mapbox Sample</h4>
      <button onClick={handleClick}>Toggle</button>
      <OurMap
        latitude={possibleMapStates[mapStateIndex].latitude}
        longitude={possibleMapStates[mapStateIndex].longitude}
        zoom={possibleMapStates[mapStateIndex].zoom}
        showMarker={possibleMapStates[mapStateIndex].showMarker}
      />
      ;
    </>
  );
}

export default App;
