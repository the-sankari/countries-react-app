import {
  FaGlobe,
  FaHome,
  FaReacteurope,
  FaSearchLocation,
  FaUser,
} from "react-icons/fa";

import { Container, Row, Col, Card } from "react-bootstrap";
import "../assets/css/about.css";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { SiGoogleauthenticator, SiPowerpages } from "react-icons/si";
import { TbApi, TbBrandRedux } from "react-icons/tb";
import { IoLogoFirebase } from "react-icons/io5";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about mt-4">
      <div className="position-relative overflow-hidden text-center bg-body-tertiary">
        <Container className="p-lg-5 my-5 preview-container">
          <h1 className="display-5 fw-bold">Project Overview</h1>
          <h3 className="fw-normal text-muted mb-3">
            This project is a React application that allows users to view
            country information and weather data. It utilizes the REST Countries
            API to fetch country details, an Open Weather Map API to display
            current weather conditions and unsplash API to get country capital
            images. Firebase is used for user authentication and data storage,
            enabling users to create accounts, log in, and store their
            preferences, including favorite countries.
          </h3>
        </Container>
        <div className="product-device shadow-sm d-none d-md-block"></div>
        <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
      </div>

      {/* Features */}
      <h1 className="pb-2 border-bottom text-center">Features</h1>
      <Container>
        <Row className="g-4 py-5">
          {/* Home page */}
          <Col lg={4} md={6} sm={12} className="feature d-flex">
            <Card className="text-center h-100 w-100">
              <Card.Body>
                <div className="feature-icons d-inline-flex align-items-center justify-content-center text-bg-info bg-gradient fs-4 rounded-3">
                  <FaHome className="text-light" />
                </div>
                <Card.Title className="fs-2 text-body-emphasis">
                  Home Page
                </Card.Title>
                <Card.Text>
                  The{" "}
                  <Link to="/" className="text-dark">
                    landing page
                  </Link>{" "}
                  with a welcome message, introduces the features of this app.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Category page */}
          <Col lg={4} md={6} sm={12} className="feature d-flex">
            <Card className="text-center h-100 w-100">
              <Card.Body>
                <div className="feature-icons d-inline-flex align-items-center justify-content-center text-bg-info bg-gradient fs-4 rounded-3">
                  <FaGlobe className="text-light" />
                </div>
                <Card.Title className="fs-2 text-body-emphasis">
                  Countries
                </Card.Title>
                <Card.Text>
                  The{" "}
                  <Link to="/countries" className="text-dark">
                    countries
                  </Link>{" "}
                  page is a list of countries around the world using Restful
                  Countries API. It has search functionality.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Search */}
          <Col lg={4} md={6} sm={12} className="feature d-flex">
            <Card className="text-center h-100 w-100">
              <Card.Body>
                <div className="feature-icons d-inline-flex align-items-center justify-content-center text-bg-info bg-gradient fs-4 rounded-3">
                  <FaSearchLocation className="text-light" />
                </div>
                <Card.Title className="fs-2 text-body-emphasis">
                  Search
                </Card.Title>
                <Card.Text>
                  Search functionality allows users to search through the list
                  of countries.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Favourites */}
          <Col lg={4} md={6} sm={12} className="feature d-flex">
            <Card className="text-center h-100 w-100">
              <Card.Body>
                <div className="feature-icons d-inline-flex align-items-center justify-content-center text-bg-info bg-gradient fs-4 rounded-3">
                  <FaHeartCircleCheck className="text-light" />
                </div>
                <Card.Title className="fs-2 text-body-emphasis">
                  Favourites
                </Card.Title>
                <Card.Text>
                  <Link to="/favourites" className="text-dark">
                    Favourites
                  </Link>{" "}
                  page displays the user&apos;s favourite countries list that was
                  added from the country list. The data is stored in Firebase
                  for the specific user.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Countries Single page */}
          <Col lg={4} md={6} sm={12} className="feature d-flex">
            <Card className="text-center h-100 w-100">
              <Card.Body>
                <div className="feature-icons d-inline-flex align-items-center justify-content-center text-bg-info bg-gradient fs-4 rounded-3">
                  <SiPowerpages className="text-light" />
                </div>
                <Card.Title className="fs-2 text-body-emphasis">
                  Countries Single Page
                </Card.Title>
                <Card.Text>
                  <Link to="/countries/:single" className="text-dark">
                    Single page
                  </Link>{" "}
                  displays detailed information about a country using Wikipedia,
                  Unsplash, and Open Weather APIs.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* User Authentication */}
          <Col lg={4} md={6} sm={12} className="feature d-flex">
            <Card className="text-center h-100 w-100">
              <Card.Body>
                <div className="feature-icons d-inline-flex align-items-center justify-content-center text-bg-info bg-gradient fs-4 rounded-3">
                  <FaUser className="text-light" />
                </div>
                <Card.Title className="fs-2 text-body-emphasis">
                  User
                </Card.Title>
                <Card.Text>
                  Registration and login pages for user activities, using
                  Firebase Authentication. New users can register easily and
                  quickly.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* My Learnings */}
      <Container className="px-4 py-5" id="icon-grid">
        <h2 className="pb-2 border-bottom text-center">My Learnings</h2>
        <p className="card-text text-center">
          While working on this project, I gained valuable experience in React
          Advance things as bellows
        </p>
        <Row className="g-4 py-5">
          <Col lg={3} md={6} sm={12} className="d-flex align-items-start">
            <div className="learning-icons feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-success bg-gradient fs-4 rounded-3 mx-2">
              <FaReacteurope className="text-light" />
            </div>
            <div>
              <h3 className="fw-bold mb-0 fs-4 text-body-emphasis">
                React Advance
              </h3>
              <p>
                Learning different state management methods, layouts and other
                advance features.
              </p>
            </div>
          </Col>

          <Col lg={3} md={6} sm={12} className="d-flex align-items-start">
            <div className="learning-icons feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-success bg-gradient fs-4 rounded-3 mx-2">
              <TbBrandRedux className="text-light" />
            </div>
            <div>
              <h3 className="fw-bold mb-0 fs-4 text-body-emphasis">
                React Redux
              </h3>
              <p>
                Gained a deeper understanding of redux for state management.
              </p>
            </div>
          </Col>

          <Col lg={3} md={6} sm={12} className="d-flex align-items-start">
            <div className="learning-icons feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-success bg-gradient fs-4 rounded-3 mx-2">
              <TbApi className="text-light" />
            </div>
            <div>
              <h3 className="fw-bold mb-0 fs-4 text-body-emphasis">
                API Integration
              </h3>
              <p>
                Learned how to integrate APIs with React applications using
                redux.
              </p>
            </div>
          </Col>

          <Col lg={3} md={6} sm={12} className="d-flex align-items-start">
            <div className="learning-icons feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-success bg-gradient fs-4 rounded-3 mx-2">
              <SiGoogleauthenticator className="text-light" />
            </div>
            <div>
              <h3 className="fw-bold mb-0 fs-4 text-body-emphasis">
                Authentication
              </h3>
              <p>
                Learned how to implement authentication using Firebase and
                Redux. Used <IoLogoFirebase /> firebase for user registraion and
                login and get the service.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
