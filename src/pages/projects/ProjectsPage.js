import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/ProjectsPage.module.css";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Project from "./Project";

import NoResults from "../../assets/no-results.png";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function ProjectsPage({ message, filter = "" }) {
  const [projects, setProjects] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axiosReq.get(
          `/projects/?${filter}search=${query}`
        );
        setProjects(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchProjects();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <>
      {currentUser ? (
        <>
          <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={12}>
              <i className={`fas fa-search ${styles.searchIcon}`} />
              <Form
                className={styles.SearchBar}
                onSubmit={(event) => event.preventDefault()}
              >
                <Form.Control
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  type="text"
                  className="mr-sm-2"
                  placeholder="Search your Projects"
                />
              </Form>
              <p>Your projects listed from newest to oldest:</p>
              {hasLoaded ? (
                <>
                  {projects.results.length ? (
                    <InfiniteScroll
                      children={projects.results.map((project) => (
                        <Project
                          key={project.id}
                          {...project}
                          setProjects={setProjects}
                        />
                      ))}
                      dataLength={projects.results.length}
                      loader={<Asset spinner />}
                      hasMore={!!projects.next}
                      next={() => fetchMoreData(projects, setProjects)}
                    />
                  ) : (
                    <Container className={appStyles.Content}>
                      <Asset
                        src={NoResults}
                        message={"Get started by creating a project"}
                      />
                      <Link
                        className={`${styles.NavLink} ${appStyles.Center}`}
                        activeClassName={styles.Active}
                        to="/projects/create"
                      >
                        <i className="fas fa-plus-square"></i>Create Project
                      </Link>
                    </Container>
                  )}
                </>
              ) : (
                <Container className={appStyles.Content}>
                  <Asset spinner />
                </Container>
              )}
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Container className={appStyles.Content}>
            <div>
              <p>Welcome to TaskFlow! </p>
              <p> Create your project and manage your tasks.</p>
              <p>Sign in to get started</p>
            </div>
          </Container>
        </>
      )}
    </>
  );
}

export default ProjectsPage;
