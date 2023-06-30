import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../assets/taskflow-logo.png';
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
    <Container>
      <Navbar className={styles.NavBar} bg="light" expand="md" fixed="top">
        <Navbar.Brand href="#home">
          <img src={logo} alt="logo" height="45" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="Home">
              <i className="fas fa-home"></i>Home
            </Nav.Link>
            <Nav.Link href="Sign in">
              <i className="fas fa-sign-in-alt"></i>Link
            </Nav.Link>
            <Nav.Link href="Sign up">
              <i className="fas fa-user-plus"></i>Link
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default NavBar;
