import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { auth, logout } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <Navbar bg="dark" className=" mb-5" variant="dark">
      <Container className="justify-content-end">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link className="fw-bold">Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/countries">
              <Nav.Link className="fw-bold">Countries</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link className="fw-bold">Register</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link className="fw-bold">Login</Nav.Link>
            </LinkContainer>
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
                  variant="outline-light"
                  size="sm"
                >
                  Logout
                </Button>
                <div className="text-success m-2 ">
                  Welcome , {user.email.split("@")[0]}
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
