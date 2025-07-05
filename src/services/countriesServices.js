import axios from "axios";
import { getCountries, isLoading, setError } from "../store/countriesSlice";

const baseUrl =
  "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca3,languages,currencies";

const getAllCountries = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const initializeCountries = () => {
  return async (dispatch) => {
    dispatch(isLoading(true)); // Set loading to true at the start
    try {
      const countries = await getAllCountries(); // Await the countries data
      dispatch(getCountries(countries)); // Now you can dispatch the countries data
    } catch (error) {
      console.error("Error fetching countries:", error);
      dispatch(setError(error.message)); // Dispatch error message
      dispatch(getCountries([])); // Set empty array on error to avoid undefined
    } finally {
      dispatch(isLoading(false)); // Ensure loading state is updated
    }
  };
};

export { getAllCountries, initializeCountries };
