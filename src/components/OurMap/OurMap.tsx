import * as React from "react";
import Map, { LngLatBoundsLike, Marker, Popup } from "react-map-gl";
import Icon_101 from "../../assets/ic_outage_map_101-500_fill_theme.svg";
import Icon_3_100 from "../../assets/ic_outage_map_3-100_fill_theme.svg";

import Icon_500 from "../../assets/ic_outage_map_501-2000_fill_theme.svg";

export interface IOurMapProps {
  longitude: number;
  latitude: number;
  zoom: number;
  showMarker: boolean;
}
// const DEFAULT_PROPS = {
//   latitude: 39.8283,
//   longitude: -98.5795,
//   zoom: 3.6,
// };
const bounds: LngLatBoundsLike = [
  { lng: -133.2421875, lat: 16.972741 },
  { lng: -47.63671875, lat: 52.696361 },
];

const mock_outage_data = [
  {
    lat: 40.2704713,
    lng: -75.2595727,
    icon: Icon_101,
  },
  {
    lat: 40.2626239,
    lng: -75.280775,
    icon: Icon_3_100,
  },
  {
    lat: 40.2626239,
    lng: -75.270775,
    icon: Icon_500,
  },
  {
    lat: 40.2624713,
    lng: -75.2595727,
    icon: "https://static.cimcontent.net/common-web-assets/xds_icons/svg/xfinityhome/ic_xfinityhome_fill.svg",
  },
];

const OurMap: React.FC<IOurMapProps> = ({
  latitude,
  longitude,
  zoom,
  showMarker = false,
}) => {
  const [popupInfo, setPopupInfo] = React.useState<{
    lat: number;
    lng: number;
    icon: string;
  } | null>(null);

  React.useEffect(() => {
    setPopupInfo(null);
  }, [latitude, longitude, zoom]);

  return (
    <div className="mapContainer">
      <Map
        id="ourMap"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
        initialViewState={{ latitude, longitude, zoom }}
        viewState={{
          latitude,
          longitude,
          zoom,
          width: 1000,
          height: 500,
          bearing: 0,
          pitch: 0,
          padding: { top: 10, bottom: 10, left: 0, right: 0 },
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        style={{ width: 1000, height: 500 }}
      >
        {showMarker &&
          mock_outage_data.map(({ lat, lng, icon }) => (
            <Marker
              longitude={lng}
              latitude={lat}
              anchor="bottom"
              key={lat}
              onClick={(e) => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                e.originalEvent.stopPropagation();
                setPopupInfo({ lat, lng, icon });
              }}
            >
              {icon && <img src={icon} alt="icon" />}
            </Marker>
          ))}
        {popupInfo && (
          //   <Popup
          //     anchor="top"
          //     longitude={Number(popupInfo.lng)}
          //     latitude={Number(popupInfo.lat)}
          //     onClose={() => setPopupInfo(null)}
          //   >
          //     <div>
          //       {popupInfo.lat}, {popupInfo.lng} |{" "}
          //     </div>
          //   </Popup>
          <div
            style={{
              position: "absolute",
              top: "10",
              right: 0,
              border: "1px solid black",
              backgroundColor: "white",
              padding: "2rem",
              width: "5rem",
              display: "flex",
            }}
          >
            {popupInfo.lat}, {popupInfo.lng}
            <img src={popupInfo.icon} alt="icon" />
          </div>
        )}
      </Map>
    </div>
  );
};

export default OurMap;
