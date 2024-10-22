import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Row,
  Spinner,
  Card,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const CountrySingle = (props) => {
  const location = useLocation();
  const country = props.country || location.state.country;
  const [weather, setWeather] = useState("");
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const [images, setImages] = useState([]); // State to store the fetched images

  const navigate = useNavigate();

  // Fetch weather data
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          country.capital
        }&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      )
      .catch((error) => {
        console.log(error);
      })
      .then((response) => {
        setWeather(response?.data);
        setIsWeatherLoading(false);
      });
  }, [country.capital]);

  // Fetch images from Unsplash API
  useEffect(() => {
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${
          country.capital
        }&per_page=6&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
      )
      .then((response) => {
        setImages(response.data.results); // Set the fetched images to state
      })
      .catch((error) => {
        console.error(error);
      });
  }, [country.capital]);

  if (isWeatherLoading) {
    return (
      <Container className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          variant="info"
          className="my-5"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        {/* Country Flag and Basic Info */}
        <Col md={4} className="text-center">
          <Card className="mb-4">
            <Card.Img
              variant="top"
              src={country.flags.svg}
              alt="Country Flag"
              style={{
                maxHeight: "300px",
                objectFit: "contain",
                marginTop: "20px",
              }}
            />
            <Card.Body>
              <Card.Title className="mb-4 fw-bold">
                Country Name: {country.name.common}
              </Card.Title>

              <Card.Subtitle className="mb-4 text-muted">
                <strong>Capital: </strong>
                {country.capital}
              </Card.Subtitle>

              <Card.Subtitle className="mb-4 text-muted">
                <strong>Region: </strong>
                {country.region}
              </Card.Subtitle>

              <Card.Subtitle className="mb-4 text-muted">
                <strong>Subregion: </strong>
                {country.subregion}
              </Card.Subtitle>

              <Card.Subtitle className="mb-4 text-muted">
                <strong>Population: </strong>
                {new Intl.NumberFormat().format(country.population)}
              </Card.Subtitle>

              <Card.Subtitle className="mb-4 text-muted">
                <strong>Area: </strong>
                {new Intl.NumberFormat().format(country.area)} km²
              </Card.Subtitle>

              <Card.Subtitle className="mb-4 text-muted">
                <strong>Currency: </strong>
                {Object.values(country.currencies)
                  .map((currency) => currency.name)
                  .join(", ")}
              </Card.Subtitle>

              <Card.Subtitle className="mb-4 text-muted">
                <strong>Languages: </strong>
                {Object.values(country.languages).join(", ")}
              </Card.Subtitle>

              <Button
                variant="primary"
                onClick={() => navigate("/countries")}
                style={{ marginTop: "10px" }}
              >
                Back to Countries
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Weather Information */}
        <Col md={6}>
          <Card className="shadow-sm border-0 mb-3">
            <Card.Body>
              <h3 className="text-center mb-1">Weather in {country.capital}</h3>

              {weather ? (
                <div className="text-center mb-1">
                  <p className="lead">
                    Currently, it is{" "}
                    <strong style={{ color: "lightcoral" }}>
                      {parseInt(weather.main.temp)}°C
                    </strong>{" "}
                    with{" "}
                    <strong style={{ color: "lightcoral" }}>
                      {weather.weather[0].description}
                    </strong>{" "}
                    in <strong>{country.capital}</strong>.
                  </p>
                  <p className="lead">
                    Feels like{" "}
                    <strong style={{ color: "lightcoral" }}>
                      {parseInt(weather.main.feels_like)}°C
                    </strong>
                  </p>
                  <Image
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                    alt="Weather Icon"
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "lightcoral",
                      padding: "10px",
                      borderRadius: "50%",
                    }}
                    className="mb-1"
                  />
                </div>
              ) : (
                <div className="text-center text-muted mb-3">
                  No weather data available.
                </div>
              )}

              {/* Display Random Images of the Capital City */}
              <h4 className="text-center mb-3">
                Explore {country.capital}, {country.name.common}
              </h4>

              <Row className="gx-3 gy-3">
                {images.map((image) => (
                  <Col md={4} key={image.id} className="text-center">
                    <Image
                      src={image.urls.small}
                      alt={image.alt_description}
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "5px",
                        objectFit: "cover",
                      }}
                      className="shadow-sm"
                    />
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CountrySingle;
