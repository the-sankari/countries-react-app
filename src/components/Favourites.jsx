// Favourites to be written.
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import {
  clearFavourites,
  getFavouritesFromSource,
} from "../store/favouriteSlice";
import CountriesCard from "./CountriesCard";

// Favourites to be written
const Favourites = () => {
  const dispatch = useDispatch();
  let countriesList = useSelector((state) => state.countries.countries);
  const countriesLoading = useSelector((state) => state.countries.isLoading);
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const favouritesLoading = useSelector((state) => state.favourites.isLoading);
  const [search, setSearch] = useState("");

  console.log("favouritesList: ", favouritesList);
  console.log("countriesList inside favourites: ", countriesList);

  // Filter favourite list countries
  const filteredCountries =
    Array.isArray(favouritesList) && favouritesList.length > 0
      ? countriesList.filter((country) =>
          favouritesList.includes(country.name.common)
        )
      : [];

  // if (Array.isArray(favouritesList) && favouritesList.length > 0) {
  //   countriesList = countriesList.filter((country) =>
  //     favouritesList.includes(country.name.common)
  //   );
  // } else {
  //   countriesList = [];
  // }

  // Fetch the data on component mount
  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

  // Display loading spinner while data is loading
  if (countriesLoading || favouritesLoading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  return (
    <Container fluid>
      {/* Search Input bar */}
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: "18rem" }}
              type="search"
              className="me-2"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      {/* Clear favourite button */}
      <Row xs={2} md={3} lg={4} className="g-3 mt-3">
        <Col className="d-flex justify-content.center">
          <Button onClick={() => dispatch(clearFavourites())}>
            Clear Favourites
          </Button>
        </Col>
      </Row>
      {/* Display countries */}
      <Row xs={2} md={3} lg={4} className="g-3">
        {filteredCountries
          .filter((country) =>
            country.name.official.toLowerCase().includes(search.toLowerCase())
          )
          .map((country) => (
            <CountriesCard key={country.name.common} country={country} />
          ))}
      </Row>
    </Container>
  );
};

export default Favourites;
