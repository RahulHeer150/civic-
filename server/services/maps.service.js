const axios = require("axios");

const getAddressFromCoordinates = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );

    if (response.data.results.length > 0) {
      return response.data.results[0].formatted_address;
    }

    return "Unknown Location";

  } catch (error) {
    console.error("Geocoding error:", error.message);
    return "Location Unavailable";
  }
};

module.exports = getAddressFromCoordinates;
