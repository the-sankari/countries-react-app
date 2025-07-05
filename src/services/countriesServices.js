import axios from "axios";
import { getCountries, isLoading, setError } from "../store/countriesSlice";
import { backupCountries } from "./backupData";

// Use the stable v2 API with specific fields that work in production
const baseUrl =
  "https://restcountries.com/v2/all?fields=name,capital,region,population,flag,alpha3Code,languages,currencies";

const getAllCountries = async () => {
  try {
    const response = await axios.get(baseUrl, {
      timeout: 15000, // 15 second timeout for slower networks
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // Transform v2 data to match the expected structure
    return response.data.map((country) => ({
      name: {
        common: country.name,
        official: country.name,
      },
      capital: country.capital ? [country.capital] : [],
      region: country.region || "Unknown",
      population: country.population || 0,
      flags: {
        png: country.flag || "",
        svg: country.flag || "",
      },
      cca3: country.alpha3Code || "",
      languages: country.languages || {},
      currencies: country.currencies || {},
    }));
  } catch (error) {
    console.error("Primary API Error:", error);

    // If primary API fails, return backup data with a warning
    console.warn("Using backup country data due to API failure");
    return backupCountries;
  }
};

const initializeCountries = () => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    try {
      const countries = await getAllCountries();
      if (countries && countries.length > 0) {
        dispatch(getCountries(countries));

        // Check if we're using backup data (smaller dataset)
        if (countries.length < 50) {
          dispatch(
            setError(
              "Using limited country data due to API issues. Some features may be limited."
            )
          );
        } else {
          dispatch(setError(null)); // Clear any previous errors
        }
      } else {
        throw new Error("No countries data received");
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
      let errorMessage =
        "Failed to load countries. Please check your internet connection and try again.";

      if (error.code === "ECONNABORTED") {
        errorMessage = "Request timed out. Please try again.";
      } else if (error.response) {
        errorMessage = `Server error: ${error.response.status}. Please try again later.`;
      } else if (error.request) {
        errorMessage = "Network error. Please check your internet connection.";
      }

      dispatch(setError(errorMessage));
      dispatch(getCountries([]));
    } finally {
      dispatch(isLoading(false));
    }
  };
};

export { getAllCountries, initializeCountries };
