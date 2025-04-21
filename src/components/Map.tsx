"use client";

import { GoogleMap, Marker, useJsApiLoader, InfoWindow  } from "@react-google-maps/api";
import React, { useState } from "react";

export interface Restaurant {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
}

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 28.6139,  // Default (New Delhi)
  lng: 77.2090,
};

interface Props {
  restaurants: Restaurant[];
}

const Map: React.FC<Props> = ({ restaurants }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [selected, setSelected] = useState<Restaurant | null>(null);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.id}
          position={restaurant.location}
          onClick={() => setSelected(restaurant)}
        />
      ))}

      {selected && (
        <InfoWindow
          position={selected.location}
          onCloseClick={() => setSelected(null)}
        >
          <div>
            <h3 className="font-bold">{selected.name}</h3>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Map;

