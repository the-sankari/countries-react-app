/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Button, Container, Form, Row, Col, Card, Fade } from "react-bootstrap";
import logo from "../assets/img/Countries.png";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { useState } from "react";
const FormCard = ({
  title,
  subTitle,
  handleSubmit,
  formFields,
  buttonText,
  linkText,
  linkTo,
  linkDescription,
}) => {
  const [openText, setOpenText] = useState(false);
  const handleOpenText = () => {
    setOpenText(!openText);
  };

  return (
    <Container className="mt-5" style={{ marginTop: "100px" }}>
      <Row className="justify-content-center">
        <Card style={{ width: "30rem" }}>
          <Card.Img
            variant="top"
            src={logo}
            style={{ width: "150px", alignSelf: "center", marginTop: "20px" }}
          />
          <Card.Body className="text-center">
            <Card.Title>{title} </Card.Title>
            <Card.Text>{subTitle} </Card.Text>
          </Card.Body>
          <Row className="d-flex justify-content-center text-center">
            <Col>
              <Button
                variant="outline-info"
                style={{ padding: "10px 24px " }}
                onClick={handleOpenText}
                aria-expanded={openText}
                aria-controls="fade-text"
              >
                <FaApple />
              </Button>
            </Col>
            <Col>
              <Button
                variant="outline-info"
                style={{ padding: "10px 24px " }}
                onClick={handleOpenText}
                aria-controls="fade-text"
                aria-expanded={openText}
              >
                <FaGoogle />
              </Button>
            </Col>
            <Col>
              <Button
                variant="outline-primary"
                style={{ padding: "10px 24px " }}
                onClick={handleOpenText}
                aria-controls="fade-text"
                aria-expanded={openText}
              >
                <FaFacebook />
              </Button>
            </Col>
            <Fade in={openText}>
              <div className="fade-text text-muted" size="sm">
                This feature is not available right now. Please login with your
                eamil address and password. Thank you.
              </div>
            </Fade>
            <p className="text-center">____________ OR _____________</p>
          </Row>
          <Card.Body>
            <Form>
              {formFields.map((field, index) => (
                <Form.Group
                  className="mb-3"
                  controlId={field.controlId}
                  key={index}
                >
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Control
                    type={field.type}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={field.onChange}
                    required={field.required}
                  />
                </Form.Group>
              ))}
            </Form>
          </Card.Body>

          <Card.Body className="text-center">
            <Button
              style={{
                padding: "10px 14px",
                width: "100%",
                fontSize: "1.5rem",
              }}
              variant="primary"
              type="submit"
              onClick={handleSubmit}
            >
              {buttonText}
            </Button>
            <p className="text-center mt-3">
              {linkDescription} <Link to={linkTo}>{linkText}</Link>
            </p>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default FormCard;
