import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="p-3 text-center"
      style={{
        backgroundColor: "#d0e5ff",
        borderTop: "1px solid #e9ecef",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p style={{ margin: 0, flexGrow: 1 }}>
        &copy; {new Date().getFullYear()} Countries React App. All rights
        reserved.
      </p>
      <div style={{ display: "flex", alignItems: "center" }}>
        <a
          href="https://github.com/the-sankari"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginLeft: "1rem",
            textDecoration: "none",
            color: "black",
          }}
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://linkedin.com/kajol-sutra-dhar"
          // link
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginLeft: "1rem",
            textDecoration: "none",
            color: "black",
          }}
        >
          <FaLinkedin size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
