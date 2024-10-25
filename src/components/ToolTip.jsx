import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import "../assets/css/home.css"

const ToolTip = () => {
  const Link = ({ id, children, title }) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
      <a href="#">{children}</a>
    </OverlayTrigger>
  );
  return (
    <>
      <Link id="clearFavs" title="Nothing to clear">
            Clear Favourites
      </Link>
    </>
  );
};

export default ToolTip;
