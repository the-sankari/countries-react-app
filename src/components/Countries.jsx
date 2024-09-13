import { useEffect } from "react";
import {
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

const Countries = () => {
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);
  console.log("Countries: where", countries);
  console.log("isLoading: ", isLoading);

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  // Handle the loading case here first (use Col, and Spinner)
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

  // Handle the received data case here.
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
        {countries.map((country) => (
          <Col className="mt-5" key={country.name.official}>
            {/* Link will be here */}
            <Card className="h-100">
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
                    <i className="bi bi-people me-2">{country.population}</i>
                  </ListGroupItem>
                  {/* Add 2 additional list items, containing currencies for the country and languages */}
                  <ListGroupItem>
                    <i className="me-2">
                      {Object.values(country.currencies || {})
                        .map((currency) => currency.name)
                        .join(", ") || "No currency"}
                    </i>
                  </ListGroupItem>
                  <ListGroupItem>
                    <i className="me-2">
                      {Object.values(country.languages || {})}
                    </i>
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Countries;
