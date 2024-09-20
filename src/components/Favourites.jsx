import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";

const Favourites = () => {
  const disatch = useDispatch();
  let countriesList = useSelector((state) => state.countries.countries);
  const [search, setSearch] = useState("");
  const countriesLoading = useSelector((state) => state.countries.isLoading);
  const favouriteList = useSelector((state) => state.favourites.favourites);
  const favouriteLoading = useSelector((state) => state.favourites.isLoading);
  if (favouriteList) {
    countriesList = countriesList.filter((country) =>
      favouriteList.includes(country.name.common)
    );
  } else {
    countriesList = [];
  }

  useEffect(() => {
    disatch(initializeCountries());
  }, [disatch]);
  if (countriesLoading || favouriteLoading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="primary"
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Col>
    );
  }
  return (
    <Container className="fluid">
      <Row>
        <Col className="text-center m-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: "18rem" }}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Favourites;
