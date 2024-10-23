import { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  ListGroup,
  ListGroupItem,
  Spinner,
} from "react-bootstrap";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import { search } from "../store/countriesSlice";
import { addFavourite } from "../store/favouritesSlice";
import { Link } from "react-router-dom";

const Countries = () => {
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);
  const favourites = useSelector((state) => state.favourites.favourites); // Add this line

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  if (isLoading) {
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
        <Col className="mt-5 d-flex justify-context-center">
          <Form>
            <Form.Control
              style={{ width: "18rem" }}
              type="search"
              className="me-2"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => dispatch(search(e.target.value))}
            />
          </Form>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} className="g-3">
        {countries
          .filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(searchInput.toLowerCase())
          )
          .map((country) => (
            <Col className="mt-5" key={country.name.official}>
              <Card className="h-100">
                <Link
                  to={`/countries/${country.name.common}`}
                  state={{ country: country }}
                >
                  <Card.Img
                    variant="top"
                    src={country.flags.svg}
                    alt={country.name.common}
                    className="rounded h-50"
                    style={{
                      objectFit: "cover",
                      minHeight: "200px",
                      maxHeight: "200px",
                    }}
                  />
                </Link>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{country.name.common}</Card.Title>
                  <Card.Subtitle className="mb-5 text-muted">
                    {country.name.official}
                  </Card.Subtitle>
                  <ListGroup
                    variant="flush"
                    className="flex-grow-1 justify-content-center"
                  >
                    <ListGroupItem>
                      <i className="bi bi-people me-2">
                        {country.population.toLocaleString()}
                      </i>
                    </ListGroupItem>
                    <ListGroupItem>
                      <i className="me-2">
                        {Object.values(country.currencies || {})
                          .map((currency) => currency.name)
                          .join(", ") || "No currency"}
                      </i>
                    </ListGroupItem>
                    <ListGroupItem>
                      <i className="me-2">
                        {Object.values(country.languages || {})
                          .map((language) => language)
                          .join(", ") || "No language"}
                      </i>
                    </ListGroupItem>
                  </ListGroup>
                  <Button
                    variant={
                      favourites.includes(country.name.common)
                        ? "success"
                        : "primary"
                    }
                    onClick={() => {
                      if (!favourites.includes(country.name.common)) {
                        dispatch(addFavourite(country.name.common));
                      }
                    }}
                  >
                    {favourites.includes(country.name.common)
                      ? "Added to Favourite"
                      : "Add Favourite"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Countries;
