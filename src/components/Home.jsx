import { Accordion, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/css/home.css";
import flags from "../assets/img/flags.jpg";
import registerImage from "../assets/img/registration.jpg";
import loginImage from "../assets/img/login.webp";
import countriesImage from "../assets/img/countries.webp";
import languages from "../assets/img/languages.webp";
import favoritesImage from "../assets/img/favourites.png";
import weather from "../assets/img/weather.avif";
import regions from "../assets/img/regions.png";
import userDashboard from "../assets/img/user_dashboard.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import ProtectedRoute from "../auth/ProtectedRoute";

const Home = () => {
  const [user] = useAuthState(auth);

  return (
    <Container fluid className="text-center homepage-hero">
      <Row className="justify-content-center mb-4">
        <Col className="homepage-hero">
          <div className="hero-video--overlay">
            <div className="hero-text">Explore the World</div>
            <div className="hero-btns">
              <p className="hero-text-p">Want to know how?</p>
              <Link
                to={!user ? "/login" : "/countries"}
                className="hero-btn-plan"
              >
                get started
              </Link>
            </div>
          </div>
          <div className="hero-video--wrap">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="hero-bg-video"
              poster="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              onError={(e) => {
                console.warn("Video failed to load, using poster image");
                e.target.style.display = "none";
                // Show the background image from CSS
                e.target.parentElement.style.background =
                  "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover no-repeat";
              }}
            >
              <source
                type="video/mp4"
                src="https://cdn.jacadatravel.com/wp-content/uploads/2024/11/Homepage-Jacada-hero-video-2024.mp4"
              />
              {/* Fallback for browsers that don't support video */}
              Your browser does not support the video tag.
            </video>
          </div>
        </Col>
        <Col md={10}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Discover new horizons, one country at a time!
              </Card.Title>

              <Row className="text-center">
                {/* User Registration Card */}
                <Col md={4}>
                  <Card className="mb-4">
                    <Card.Img
                      variant="top"
                      src={flags}
                      alt="flags"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <Card.Body>
                      <Card.Title>Flags</Card.Title>
                      <Card.Text style={{ fontSize: "1.2rem" }}>
                        Wave your pride, discover the world through its flags!
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Login Card */}
                <Col md={4}>
                  <Card className="mb-4">
                    <Card.Img
                      variant="top"
                      src={languages}
                      alt="languages"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <Card.Body>
                      <Card.Title>Languages</Card.Title>
                      <Card.Text style={{ fontSize: "1.2rem" }}>
                        Language: The Bridge to Global Understanding!
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Countries Information Card */}
                <Col md={4}>
                  <Card className="mb-4">
                    <Card.Img
                      variant="top"
                      src={weather} // Example image for countries
                      alt="weather"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <Card.Body>
                      <Card.Title>Weather</Card.Title>
                      <Card.Text style={{ fontSize: "1.2rem" }}>
                        Chase the Sun in Finland, Dance in the Rain in Brazil!
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Accordion for Additional Information */}
              <Accordion defaultActiveKey="1" className="mt-4">
                <div className="custom-accordion">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <div className="explore-header">Explore Features</div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Row className="text-center">
                        {/* Feature Cards Inside Accordion */}
                        <Col md={4}>
                          <Card className="mb-4">
                            <Card.Img
                              variant="top"
                              src={registerImage} // Image for register
                              alt="Register"
                              style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                              }}
                            />
                            <Card.Body>
                              <Card.Title>Register</Card.Title>
                              <Card.Text
                                style={{
                                  color: "#003366",
                                  fontStyle: "italic",
                                }}
                              >
                                Register with your name & email to create an
                                account.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>

                        <Col md={4}>
                          <Card className="mb-4">
                            <Card.Img
                              variant="top"
                              src={loginImage} // Image for login
                              alt="Log In"
                              style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                              }}
                            />
                            <Card.Body>
                              <Card.Title>Log In</Card.Title>
                              <Card.Text
                                style={{
                                  color: "#003366",
                                  fontStyle: "italic",
                                }}
                              >
                                Log in with your email & password to access your
                                account.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>

                        <Col md={4}>
                          <Card className="mb-4">
                            <Card.Img
                              variant="top"
                              src={countriesImage} // Image for countries
                              alt="Countries"
                              style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                              }}
                            />
                            <Card.Body>
                              <Card.Title>Countries</Card.Title>
                              <Card.Text
                                style={{
                                  color: "#003366",
                                  fontStyle: "italic",
                                }}
                              >
                                Explore comprehensive data about countries.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>

                        <Col md={4}>
                          <Card className="mb-4">
                            <Card.Img
                              variant="top"
                              src={favoritesImage} // Image for favorites
                              alt="Favorite Countries"
                              style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                              }}
                            />
                            <Card.Body>
                              <Card.Title>Favorite Countries</Card.Title>
                              <Card.Text
                                style={{
                                  color: "#003366",
                                  fontStyle: "italic",
                                }}
                              >
                                Easily manage your list of favorite countries.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={4}>
                          <Card className="mb-4">
                            <Card.Img
                              variant="top"
                              src={regions} // Image for favorites
                              alt="Favorite Countries"
                              style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                              }}
                            />
                            <Card.Body>
                              <Card.Title>Discover Regions</Card.Title>
                              <Card.Text
                                style={{
                                  color: "#003366",
                                  fontStyle: "italic",
                                }}
                              >
                                Take a look of countires according to their
                                regions.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={4}>
                          <Card className="mb-4">
                            <Card.Img
                              variant="top"
                              src={userDashboard} // Image for favorites
                              alt="Favorite Countries"
                              style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                              }}
                            />
                            <Card.Body>
                              <Card.Title>User Dashboard</Card.Title>
                              <Card.Text
                                style={{
                                  color: "#003366",
                                  fontStyle: "italic",
                                }}
                              >
                                Manage your profile with different features.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                </div>
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
