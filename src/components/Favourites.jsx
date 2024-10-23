import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices"; // Import the service correctly
import {
  clearFavourites,
  getFavouritesFromSource,
} from "../store/favouriteSlice";
import CountriesCard from "./CountriesCard";

// Favourites component
const Favourites = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const [search, setSearch] = useState("");
  const countriesLoading = useSelector((state) => state.countries.isLoading);
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const favouritesLoading = useSelector((state) => state.favourites.isLoading);

  // Fetch countries and favourites on component mount
  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

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

  // Filter countries based on favourites
  const filteredCountries =
    Array.isArray(favouritesList) && favouritesList.length > 0
      ? countriesList.filter((country) =>
          favouritesList.includes(country.name.common)
        )
      : [];

  return (
    <Container fluid>
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
      <Row xs={2} md={3} lg={4} className="g-3">
        <Button onClick={() => dispatch(clearFavourites())}>
          Clear Favourites
        </Button>
      </Row>
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
