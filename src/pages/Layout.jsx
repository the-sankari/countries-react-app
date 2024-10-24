import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <Container fluid>
      <Row>
        {/* Header Section */}
        <Header />
      </Row>
      <Row
        style={{
          flex: "1",
          minHeight: "calc(100vh-69px)",
          marginTop: "56px",
          marginBottom: "130px",
        }}
      >
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
