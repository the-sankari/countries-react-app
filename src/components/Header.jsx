import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { auth, logout } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
  const [user] = useAuthState(auth);

  return (
    // <Container fluid className="">
      <Navbar
        collapseOnSelect
        expand="md"
        bg="dark"
        variant="dark"
        className="justify-content-end align-items-center"
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
    // </Container>
  );
};

export default Header;
