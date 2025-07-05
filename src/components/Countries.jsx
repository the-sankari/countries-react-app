import { useEffect, useState, useTransition, useMemo } from "react";
import { Col, Form, Spinner, Tabs, Tab, Collapse } from "react-bootstrap";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import { search } from "../store/countriesSlice";
import { addFavourite } from "../store/favouritesSlice";
import { debounce } from "lodash";
import PaginationC from "./PaginationC";
import RegionTab from "./RegionTab";

import CountryCard from "./CountryCard";

const Countries = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 8;

  const countries = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);
  const error = useSelector((state) => state.countries.error);
  const favourites = useSelector((state) => state.favourites.favourites);

  const [isPending, startTransition] = useTransition();
  const [activeKey, setActiveKey] = useState("All");

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  // Debounce search handler
  const handleSearchChange = useMemo(
    () =>
      debounce((value) => {
        dispatch(search(value));
        setCurrentPage(1);
      }, 300),
    [dispatch]
  );

  const onSearchInput = (e) => {
    handleSearchChange(e.target.value);
  };

  const filteredCountries = useMemo(
    () =>
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchInput.toLowerCase())
      ),
    [countries, searchInput]
  );

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  const handlePageChange = (pageNumber) => {
    startTransition(() => {
      setCurrentPage(pageNumber);
    });
  };

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

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Row>
          <Col>
            <h3 className="text-danger">Error Loading Countries</h3>
            <p>{error}</p>
            <button
              className="btn btn-primary"
              onClick={() => dispatch(initializeCountries())}
            >
              Try Again
            </button>
          </Col>
        </Row>
      </Container>
    );
  }

  // Group countries by region
  const regions = [...new Set(countries.map((country) => country.region))];

  return (
    <Container fluid className="pt-5 ">
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: "18rem" }}
              type="search"
              className="me-2"
              placeholder="Search"
              aria-label="Search"
              value={searchInput}
              onChange={onSearchInput}
            />
          </Form>
        </Col>
      </Row>
      <Tabs
        activeKey={activeKey}
        onSelect={(k) => setActiveKey(k)}
        className="m-3 "
        fill
        variant="underline"
        transition={Collapse}
      >
        <Tab eventKey="All" title="All Countries" className="text-secondary">
          <PaginationC
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <Row xs={2} md={3} lg={4} className="g-3">
            {currentCountries.length > 0 ? (
              currentCountries.map((country) => (
                <Col className="mt-1" key={country.name.official}>
                  <CountryCard key={country.name.official} country={country} />
                </Col>
              ))
            ) : (
              <Col>
                <p>No Countries found</p>
              </Col>
            )}
          </Row>
          <PaginationC
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Tab>

        {regions.map((region) => (
          <Tab eventKey={region} title={region} key={region}>
            <RegionTab
              region={region}
              countries={countries.filter(
                (country) => country.region === region
              )}
              favourites={favourites}
              dispatch={dispatch}
              addFavourite={addFavourite}
            />
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
};

export default Countries;
