import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import {
  clearFavourites,
  getFavouritesFromSource,
} from "../store/favouritesSlice";
import CountryCard from "./CountryCard";

const Favourites = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const [search, setSearch] = useState("");
  const countriesLoading = useSelector((state) => state.countries.isLoading);
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const favouritesLoading = useSelector((state) => state.favourites.isLoading);
  const [filteredCountries, setFilteredCountries] = useState([]);

  // Fetch countries and favourites on component mount
  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

  // Filter countries based on favourites
  useEffect(() => {
    if (Array.isArray(favouritesList) && favouritesList.length > 0) {
      setFilteredCountries(
        countriesList.filter((country) =>
          favouritesList.includes(country.name.common)
        )
      );
    } else {
      setFilteredCountries([]);
    }
  }, [favouritesList, countriesList]);

  // Filter and search countries
  const filteredAndSearchedCountries = filteredCountries.filter((country) => {
    const searchTerm = search.toLowerCase();
    return (
      country.name.official.toLowerCase().includes(searchTerm) ||
      country.name.common.toLowerCase().includes(searchTerm)
    );
  });

  // Show loading spinner if data is still loading
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
        <Col className="text-center mt-3">
          <Button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to clear your favourites?"
                )
              ) {
                dispatch(clearFavourites());
              }
            }}
          >
            Clear Favourites
          </Button>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} className="g-3 mt-3">
        {filteredAndSearchedCountries.length === 0 ? (
          <Col className="text-center">
            <p>No favourites found.</p>
          </Col>
        ) : (
          filteredAndSearchedCountries.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))
        )}
      </Row>
    </Container>
  );
};

export default Favourites;
