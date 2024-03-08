import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const NavbarComp = () => {
  return (
    <Navbar className="text-light" expand="lg">
      <Container className="container-fluid">
        <Navbar.Brand as={Link} to="/">
          Writer's Realm
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              HOME
            </Nav.Link>
            <Nav.Link as={Link} to="/users">
              USERS
            </Nav.Link>
            <Nav.Link as={Link} to="/comments">
              COMMENTS
            </Nav.Link>
            <Nav.Link as={Link} to="/blogs">
              BLOGS
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
