import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useState } from "react";

export default function NavigationBar() {

    const [hovered, setHovered] = useState("");

    const navStyle = {
        backgroundColor: "#C5050C",
        width: "100%"
    };

    const linkStyle = {
        color: "white",
        marginLeft: "1rem",
        textDecoration: "none"
    };

    const hoverStyle = {
        color: "#ffdddd"
    };

    return (
        <Navbar expand="sm" style={navStyle}>
            <Container fluid>

                <Navbar.Brand
                    as={Link}
                    to="/"
                    style={{ color: "white", marginLeft: "1rem" }}
                >
                    BadgerFind
                </Navbar.Brand>

                <Nav className="ms-auto me-3">

                    <Nav.Link
                        as={Link}
                        to="/"
                        style={{
                            ...linkStyle,
                            ...(hovered === "search" ? hoverStyle : {})
                        }}
                        onMouseEnter={() => setHovered("search")}
                        onMouseLeave={() => setHovered("")}
                    >
                        Search
                    </Nav.Link>

                    <Nav.Link
                        as={Link}
                        to="/saved"
                        style={{
                            ...linkStyle,
                            ...(hovered === "saved" ? hoverStyle : {})
                        }}
                        onMouseEnter={() => setHovered("saved")}
                        onMouseLeave={() => setHovered("")}
                    >
                        Saved
                    </Nav.Link>

                    <Nav.Link
                        as={Link}
                        to="/settings"
                        style={{
                            ...linkStyle,
                            ...(hovered === "settings" ? hoverStyle : {})
                        }}
                        onMouseEnter={() => setHovered("settings")}
                        onMouseLeave={() => setHovered("")}
                    >
                        Settings/About
                    </Nav.Link>

                </Nav>

            </Container>
        </Navbar>
    );
}