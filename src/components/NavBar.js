import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/taskflow-logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch(err) {
      console.log(err);
    }
  }

  const addProjectIcon = (
    <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/projects/create"
      >
        <i className="fas fa-plus-square"></i>Create Project
      </NavLink>
  )
  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/projects"
      >
        <i className="fa-regular fa-rectangle-history"></i>Projects
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/tasks"
      >
        <i className="fa-regular fa-diagram-subtask"></i>Tasks
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to="/"
        onClick={handleSignOut}
      >
        <i className="fas fa-sign-out-alt"></i>Sign Out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>Sign In
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className="fas fa-user-plus"></i>Sign Up
      </NavLink>
    </>
  );

  return (
    <Container>
      <Navbar className={styles.NavBar} bg="light" expand="md" fixed="top">
        <NavLink to="/">
          <Navbar.Brand href="#home">
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addProjectIcon}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fas fa-home"></i>Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default NavBar;
