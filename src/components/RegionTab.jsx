// RegionTab.js
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RegionTab = ({ region, countries, favourites, dispatch, addFavourite }) => {
  return (
    <div>
      <h3>{region}</h3>
      <Row xs={2} md={3} lg={4} className="g-3">
        {countries.map((country) => (
          <Col className="mt-5" key={country.name.official}>
            <Card className="h-100">
              <Link
                to={`/countries/${country.name.common}`}
                state={{ country }}
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
    </div>
  );
};

export default RegionTab;
