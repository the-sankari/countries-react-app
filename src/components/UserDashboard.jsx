import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import userPlaceholderImage from "../assets/img/userPlaceholer.png";
import Favourites from "./Favourites";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [user] = useAuthState(auth);
  const createtAtTimeStamp = user?.metadata?.createdAt;
  let formattedDate = "N/A";
  if (createtAtTimeStamp) {
    const createdAtDate = new Date(Number(createtAtTimeStamp));
    if (!isNaN(createdAtDate.getTime())) {
      formattedDate = createdAtDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  }
  return (
    <Container fluid className="mt-5 text-center justify-content-center">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow p-3 mb-5 bg-white rounded">
            <Card.Body>
              <Card.Title className="text-center">User Dashboard</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow p-3 mb-5 bg-white rounded">
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
                  <strong>Joined:</strong> {formattedDate}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow p-3 mb-5 bg-white rounded">
            <Card.Body>
              <Card.Title className="text-center">User Details</Card.Title>
              <Col md={6}  >
                <Card>
                  <Card.Body>
                    <ListGroup>
                      <ListGroup.Item>
                        <strong>Username:</strong> {user.username}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <strong>Role:</strong> {user.role}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <strong>Verified:</strong>{" "}
                        {user.emailVerified ? "Yes" : "No"}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <strong>Blocked:</strong> {user.blocked ? "Yes" : "No"}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <strong>
                          <Link style={{ color: "ButtonText" }}>Setting</Link>
                        </strong>{" "}
                        <Link></Link>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}  >
                <Card>
                  <Card.Body>
                    <ListGroup>
                      <ListGroup.Item>
                        <strong>Username:</strong> {user.username}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <strong>Role:</strong> {user.role}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <strong>Verified:</strong>{" "}
                        {user.emailVerified ? "Yes" : "No"}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <strong>Blocked:</strong> {user.blocked ? "Yes" : "No"}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <strong>
                          <Link style={{ color: "ButtonText" }}>Setting</Link>
                        </strong>{" "}
                        <Link></Link>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
              

            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="shadow p-3 mb-5 bg-white rounded">
            <Card.Body>
              <h4>
                Your Saved{" "}
                <Link to="/favourites" style={{ color: "ButtonText" }}>
                  Favourites
                </Link>{" "}
              </h4>
              <Favourites />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
