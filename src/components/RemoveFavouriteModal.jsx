/* eslint-disable react/prop-types */
import React from "react";
import { Button, Modal } from "react-bootstrap";

const RemoveFavouriteModal = ({
  show,
  handleClose,
  handleRemoveFavourite,
  title,
  messege,
}) => {
  return (
    <Modal show={show} onHide={handleClose} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{messege}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="outline-danger" onClick={handleRemoveFavourite}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveFavouriteModal;
