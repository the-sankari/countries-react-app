import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { auth, logout } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Layout = () => {
  const [user] = useAuthState(auth);

  return (
    <Container fluid>
      <Row>
        {/* Header Section */}
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark"className="justify-content-end align-items-center"
         style={{ marginBottom: "1rem", backgroundColor: "#d0e5ff" }}
        >
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link className="fw-bold">Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/countries">
                <Nav.Link className="fw-bold">Countries</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/favourites">
                <Nav.Link className="fw-bold">Favourites</Nav.Link>
              </LinkContainer>
              {/* Conditionally render Register and Login links */}
              {!user ? (
                <>
                  <LinkContainer to="/register">
                    <Nav.Link className="fw-bold">Register</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link className="fw-bold">Login</Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <Button
                    onClick={logout}
                    className="fw-bold"
                    variant="outline-secondary"
                    size="sm"
                  >
                    Logout
                  </Button>
                  <LinkContainer to="/user">
                    <Nav.Link
                      className="fw-bold text-success"
                      style={{
                        marginLeft: "50rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      {" "}
                      Welcome, {user.email.split("@")[0]}
                    </Nav.Link>
                  </LinkContainer>
                  
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Row>
      <Row style={{ flex: "1", minHeight: "calc(100vh-69px)" }}>
        {" "}
        <Outlet />
      </Row>
      {/* Footer section  */}
      <Row>
        <Footer />
      </Row>
    </Container>
  );
};

export default Layout;
