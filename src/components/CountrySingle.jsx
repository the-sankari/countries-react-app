import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { initializeCountries } from "../services/countriesServices";
import axios from "axios";
import {
  Button,
  Card,
  Container,
  Image,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";

const CountrySingle = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // const country = location.state?.country;
  const country = location.state.country;
  const [weather, setWeather] = useState("");
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          country.capital
        }&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
        setIsWeatherLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsWeatherLoading(false); // Don't forget to set this to false in case of an error
      });
  }, [country.capital]);

  console.log("Weather:", weather);

  // Handle the loading case first

  if (isWeatherLoading) {
    return (
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
    );
  }

  // Show weather data here (minimum requirements are: Temperature, weather description and an icon)



  return (
    <Container fluid className="w-50 d-flex justify-content-center ">
      <Card>
        <Card.Img
          variant="top"
          src={country.flags.svg}
          alt={country.name.common}
          className="rounded h-50 "
          style={{
            objectFit: "cover",
            minHeight: "200px",
            maxHeight: "200px",
          }}
        />
        <Card.Header>
          <Card.Title>{country.name.common}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
          </Card.Text>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <h5>Capital: {country.capital}</h5>
            </ListGroup.Item>
            <ListGroup.Item>Temperature: {weather.main.temp}</ListGroup.Item>
            <ListGroup.Item>
              Feels Like : {weather.main.feels_like}
            </ListGroup.Item>
            <ListGroup.Item>
              Weather description: {weather.weather[0].description}
              <Image
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                roundedCircle
              />
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Button variant="secondary" onClick={() => navigate(-1)}>Go Back</Button>
      </Card>
    </Container>
  );
};

export default CountrySingle;
