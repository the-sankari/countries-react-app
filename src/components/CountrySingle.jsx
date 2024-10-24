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
  Alert,
} from "react-bootstrap";
import "../assets/css/countries.css"
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Importing the default marker icon images
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MdArrowBackIos } from "react-icons/md";

// Default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const CountrySingle = (props) => {
  const location = useLocation();
  const country = props.country || location.state.country;
  const [weather, setWeather] = useState(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const [isWeatherError, setIsWeatherError] = useState(false);
  const [images, setImages] = useState([]);
  const [isImagesLoading, setIsImagesLoading] = useState(true);
  const [isImagesError, setIsImagesError] = useState(false);

  const navigate = useNavigate();

  // Fetch weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${
            country.capital
          }&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setIsWeatherError(true);
      } finally {
        setIsWeatherLoading(false);
      }
    };

    fetchWeatherData();
  }, [country.capital]);

  // Fetch images from Unsplash API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?query=${
            country.capital
          }&per_page=6&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
        );
        setImages(response.data.results);
      } catch (error) {
        console.error("Error fetching images:", error);
        setIsImagesError(true);
      } finally {
        setIsImagesLoading(false);
      }
    };

    fetchImages();
  }, [country.capital]);

  if (isWeatherLoading || isImagesLoading) {
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
            <Card.Body className="text-start">
              <Card.Title className="mb-4 fw-bold ">
                {country.name.common}
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
            </Card.Body>
          </Card>
        </Col>

        {/* Weather Information */}
        <Col md={6}>
          <Card className="shadow-sm border-0 mb-3">
            <Card.Body>
              <h3 className="text-center mb-1">Weather in {country.capital}</h3>

              {isWeatherError ? (
                <Alert variant="danger">Could not fetch weather data.</Alert>
              ) : weather ? (
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

              {/* Display Images of the Capital City */}
              <h4 className="text-center mb-3">
                Explore {country.capital}, {country.name.common}
              </h4>

              {isImagesError ? (
                <Alert variant="danger">Could not fetch images.</Alert>
              ) : (
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
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Button
        variant="secondary"
        onClick={() => navigate("/countries")}
        style={{ marginTop: "10px" }}
        className="back-to-countries fw-bold"
      >
        <MdArrowBackIos />Back to Countries
      </Button>
      {/* Map Section */}
      <Row className="justify-content-center mt-5 mb-5">
        <Col md={8}>
          <Card>
            <Card.Title>
              <h4 className="text-center pt-2 mb-3">Map of {country.name.common}</h4>
            </Card.Title>
            <Card.Body>
              <MapContainer
                center={country.latlng} // Use latlng from country data
                zoom={6}
                style={{ height: "400px", width: "100%" }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={country.latlng}>
                  <Popup>
                    {country.name.common} <br /> {country.capital}
                  </Popup>
                </Marker>
              </MapContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CountrySingle;
