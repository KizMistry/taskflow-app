import { Container } from "react-bootstrap";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Switch, Redirect } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ProjectCreateForm from "./pages/projects/ProjectCreateForm";
import ProjectPage from "./pages/projects/ProjectPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import ProjectEditForm from "./pages/projects/ProjectEditForm";
import TaskCreateForm from "./pages/tasks/TaskCreateForm";
import TaskPage from "./pages/tasks/TaskPage";
import Tasks from "./pages/tasks/Tasks";
import TaskEditForm from "./pages/tasks/TaskEditForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <ProjectsPage
                message="Create a new Project to get started."
                filter={`owner__project_owner=${profile_id}&ordering=-created_at&`}
              />
            )}
          />
          <Route
            exact
            path="/signin"
            render={() => (!currentUser ? <SignInForm /> : <Redirect to="/" />)}
          />
          <Route
            exact
            path="/signup"
            render={() => (!currentUser ? <SignUpForm /> : <Redirect to="/" />)}
          />
          <Route
            exact
            path="/projects/create"
            render={() =>
              currentUser ? <ProjectCreateForm /> : <Redirect to="/signin" />
            }
          />
          <Route exact path="/projects" render={() => <ProjectsPage />} />
          <Route
            exact
            path="/projects/:id"
            render={() =>
              currentUser ? <ProjectPage /> : <Redirect to="/signin" />
            }
          />
          <Route
            exact
            path="/projects/:id/edit"
            render={() =>
              currentUser ? <ProjectEditForm /> : <Redirect to="/signin" />
            }
          />
          <Route
            exact
            path="/tasks"
            render={() => (currentUser ? <Tasks /> : <Redirect to="/signin" />)}
          />
          <Route
            exact
            path="/projects/:id/tasks/create"
            render={() =>
              currentUser ? <TaskCreateForm /> : <Redirect to="/signin" />
            }
          />
          <Route
            exact
            path="/tasks/:id"
            render={() =>
              currentUser ? <TaskPage /> : <Redirect to="/signin" />
            }
          />
          <Route
            exact
            path="/tasks/:id/edit"
            render={() =>
              currentUser ? <TaskEditForm /> : <Redirect to="/signin" />
            }
          />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
