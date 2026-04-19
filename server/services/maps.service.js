const axios = require("axios");

const getAddressFromCoordinates = async (lat, lng) => {
  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/reverse`,
      {
        params: {
          lat,
          lon: lng,
          format: "json",
        },
        headers: {
          "User-Agent": "crowdfix-app", // required by OSM
        },
      }
    );

    return {
      address: res.data.display_name || "",
    };

  } catch (error) {
    console.error("OSM Reverse Geocoding Error:", error.message);
    return { address: "" };
  }
};

module.exports = getAddressFromCoordinates;