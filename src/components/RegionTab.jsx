import { Col, Row } from "react-bootstrap";
import CountryCard from "./CountryCard";

const RegionTab = ({
  region,
  countries,
  favourites,
  dispatch,
  addFavourite,
}) => {
  return (
    <>
      <h3 className="text-center p-2" >{region}</h3>
      <Row xs={2} md={3} lg={4} className="g-3">
        {countries.map((country) => (
          <Col className="mt-1" key={country.name.official}>
            <CountryCard key={country.name.official} country={country} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default RegionTab;
