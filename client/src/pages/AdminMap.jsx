import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { toast } from "react-toastify";
import L from "leaflet";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5001";

// Fix marker icon issue
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const AdminMap = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await axios.get(`${API}/issues`);
        setIssues(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load issues");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading map...
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={[28.6139, 77.209]} // default (India)
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        {/* OpenStreetMap tiles */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Markers */}
        {issues.map((issue) => {
          if (!issue.location?.coordinates) return null;

          const [lng, lat] = issue.location.coordinates;

          return (
            <Marker key={issue._id} position={[lat, lng]} icon={customIcon}>
              <Popup>
                <div>
                  <h3 className="font-bold">{issue.title}</h3>
                  <p>{issue.description}</p>

                  <p className="text-sm text-gray-600">
                    📍 {issue.location?.address || "Location not available"}
                  </p>

                  <p className="text-sm">
                    Status:{" "}
                    <span
                      className={
                        issue.status === "Resolved"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {issue.status}
                    </span>
                  </p>

                  {issue.media && (
                    <img
                      src={`${API}${issue.media}`}
                      alt="issue"
                      className="mt-2 w-full h-24 object-cover rounded"
                    />
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default AdminMap;