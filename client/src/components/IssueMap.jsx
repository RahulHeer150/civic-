import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

function LocationMarker({ setLocation }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLocation(e.latlng);
    },
  });

  return position ? (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const latlng = e.target.getLatLng();
          setPosition(latlng);
          setLocation(latlng);
        },
      }}
    />
  ) : null;
}

export default function IssueMap({ setLocation }) {
  const [center, setCenter] = useState([28.6139, 77.209]); // default

  const getLiveLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      setCenter([lat, lng]);
      setLocation({ lat, lng });
    });
  };

  return (
    <div>
      <button
        type="button"
        onClick={getLiveLocation}
        className="mb-2 bg-green-500 text-white px-3 py-1 rounded"
      >
        Use My Location
      </button>

      <MapContainer center={center} zoom={13} style={{ height: "300px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker setLocation={setLocation} />
      </MapContainer>
    </div>
  );
}