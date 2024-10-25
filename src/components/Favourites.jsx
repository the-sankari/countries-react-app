import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import {
  clearFavourites,
  getFavouritesFromSource,
} from "../store/favouritesSlice";
import CountryCard from "./CountryCard";
import RemoveFavouriteModal from "./RemoveFavouriteModal";
import ToolTip from "./ToolTip";
import oopsImg from "../assets/img/oops.png";
import { Link } from "react-router-dom";

const Favourites = () => {
  const [show, setShow] = useState(false);

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

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleClearFavourites = () => {
    try {
      dispatch(clearFavourites());
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

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

      <Row xs={2} md={3} lg={4} className="g-3 mt-3 justify-content-center">
        {filteredAndSearchedCountries.length === 0 ? (
          <Col className="text-center">
            <Card>
              <Card.Img variant="top" src={oopsImg} />
              <Card.Body>
                <Card.Title>No favourites found</Card.Title>
                <Card.Text>
                  You can add favourites by browsing countries from{" "}
                  <Link to="/countries">here</Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          filteredAndSearchedCountries.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))
        )}
      </Row>
      <Row xs={2} md={3} lg={4} className="g-3 mt-5 justify-content-center">
        <Col className="text-center mt-3">
          <Button
            variant="outline-danger"
            onClick={() => {
              if (favouritesList.length !== 0) {
                handleShow();
              } else {
                <ToolTip />;
              }
            }}
            className="tooltip-button"
          >
            Clear Favourites
          </Button>
        </Col>
        <RemoveFavouriteModal
          show={show}
          title="Clear Favourites?"
          messege={`You are about to clear all. Do you want?`}
          handleClose={handleClose}
          handleRemoveFavourite={handleClearFavourites}
        />
      </Row>
    </Container>
  );
};

export default Favourites;
