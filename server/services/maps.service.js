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
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    const response = await axios.get(url);

    // 🔴 STEP 4 DEBUG LOGS (ADD THESE)
    console.log("GEOCODE STATUS:", response.data.status);
    console.log("GEOCODE RESULTS LENGTH:", response.data.results?.length);
    console.log("GEOCODE FIRST RESULT:", response.data.results?.[0]);

    const result = response.data.results[0];

    if (!result) {
      return {
        address: "Unknown Address",
        city: "",
        state: "",
        postalCode: "",
      };
    }

    // Extract address components
    let city = "";
    let state = "";
    let postalCode = "";

    result.address_components.forEach((component) => {
      if (component.types.includes("locality")) city = component.long_name;
      if (component.types.includes("administrative_area_level_1"))
        state = component.long_name;
      if (component.types.includes("postal_code"))
        postalCode = component.long_name;
    });

    
    return {
      address: result.formatted_address,
      city,
      state,
      postalCode,
    };
  } catch (error) {
    console.error("Geocoding Error:", error.message);

    return {
      address: "Unknown Address",
      city: "",
      state: "",
      postalCode: "",
    };
  }
};

module.exports = getAddressFromCoordinates;
