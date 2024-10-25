/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addFavourite, removeFavourite } from "../store/favouritesSlice";
import { HiLanguage } from "react-icons/hi2";
import { FcCurrencyExchange } from "react-icons/fc";
import { IoIosPeople } from "react-icons/io";
import { useState } from "react";
import RemoveFavouriteModal from "./RemoveFavouriteModal";

const CountryCard = ({ country }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.favourites);
  const isFavourite = favourites.includes(country.name.common);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleRemoveFavourite = () => {
    dispatch(removeFavourite(country.name.common));
  };
  return (
    <CardGroup className="mt-5" key={country.name.official}>
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
              <IoIosPeople />-{" "}
              <i className="bi bi-people me-2">
                {country.population.toLocaleString()}
              </i>
            </ListGroupItem>
            <ListGroupItem>
              <FcCurrencyExchange />-{" "}
              <i className="me-2">
                {Object.values(country.currencies || {})
                  .map((currency) => currency.name)
                  .join(", ") || "No currency"}
              </i>
              <i className="me-2 bg-secondary text-light rounded-5 p-1">
                {Object.values(country.currencies || {})
                  .map((currency) => currency.symbol)
                  .join(", ") || "No currency"}
              </i>
            </ListGroupItem>
            <ListGroupItem>
              <HiLanguage />-{" "}
              <i className="me-2">
                {Object.values(country.languages || {})
                  .map((language) => language)
                  .join(", ") || "No language"}
              </i>
            </ListGroupItem>
          </ListGroup>
        </Card.Body>
        <Card.Footer className=" text-center">
          <Button
            variant={isFavourite ? "outline-danger" : "outline-secondary"}
            onClick={() => {
              if (isFavourite) {
                handleShow();
              } else {
                dispatch(addFavourite(country.name.common)); // Add to favourites
              }
            }}
          >
            {isFavourite ? "Remove Favourite" : "Add Favourite"}
          </Button>
          <RemoveFavouriteModal
            show={show}
            title="Remove Favourite?"
            messege={`You are about to remove ${country.name.common}. Do you want?`}
            handleClose={handleClose}
            handleRemoveFavourite={handleRemoveFavourite}
          />
        </Card.Footer>
      </Card>
    </CardGroup>
  );
};

export default CountryCard;
