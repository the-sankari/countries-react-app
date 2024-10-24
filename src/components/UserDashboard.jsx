import React from "react";
import { Card, Container, ListGroup, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import userPlaceholderImage from "../assets/img/userPlaceholer.png";

const UserDashboard = () => {
  const [user] = useAuthState(auth);
  return (
    <Container fluid className="mt-5 text-center justify-content-center">
      <Row className="justify-content-center">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Img
              style={{
                width: "50%",
                padding: "5px",
                boxShadow: "0 0 5px 0 #444",
                borderRadius: "50%",
              }}
              variant="top"
              src={user?.photoURL || userPlaceholderImage}
              alt="User Profile Picture"
            />
            <Card.Title>
              Welcome, {user.name || user.email.split("@")[0].toUpperCase()}
            </Card.Title>
            <ListGroup>
              <ListGroup.Item>
                <strong>Email:</strong> {user.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Phone:</strong> {user.phoneNumber || "Not Provided"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Joined:</strong> {user.metadata.createdAt}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default UserDashboard;
