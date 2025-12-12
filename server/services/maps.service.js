// const axios = require("axios");

// const getAddressFromCoordinates = async (lat, lng) => {
//   try {
//     const response = await axios.get(
//       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`
//     );

//     if (response.data.results.length > 0) {
//       return response.data.results[0].formatted_address;
//     }

//     return "Unknown Location";

//   } catch (error) {
//     console.error("Geocoding error:", error.message);
//     return "Location Unavailable";
//   }
// };

// module.exports = getAddressFromCoordinates;
const axios = require("axios");

const getAddressFromCoordinates = async (lat, lng) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );

    const result = response.data.results[0];
    if (!result) return {};

    let city = "";
    let state = "";
    let postalCode = "";

    result.address_components.forEach((comp) => {
      if (comp.types.includes("locality")) city = comp.long_name;
      if (comp.types.includes("administrative_area_level_1")) state = comp.long_name;
      if (comp.types.includes("postal_code")) postalCode = comp.long_name;
    });

    return {
      address: result.formatted_address,
      city,
      state,
      postalCode
    };

  } catch (error) {
    console.error("Geocoding error:", error.message);
    return {};
  }
};

module.exports = getAddressFromCoordinates;

