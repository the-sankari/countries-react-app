import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import errorImg from "../assets/img/error.jpg";
const ErrorPage = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center text-center">
        <Col md={8}>
          <Card>
            <Card.Img variant="top" src={errorImg} />
            <Card.Body>
              <h1 className="text-danger">404 Error</h1>
              <p className="text-muted">Page Not Found</p>
              <Link to="/">
                <Button variant="primary" md={3} className="sm">
                  Go Back Home
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
