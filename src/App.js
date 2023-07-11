import { Container } from "react-bootstrap";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ProjectCreateForm from "./pages/projects/ProjectCreateForm";
import ProjectPage from "./pages/projects/ProjectPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import ProjectEditForm from "./pages/projects/ProjectEditForm";
import TaskCreateForm from "./pages/tasks/TaskCreateForm";

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
              filter={`owner__project_owner=${profile_id}&ordering=-created_at&`} />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/projects/create"
            render={() => <ProjectCreateForm />}
          />
          <Route exact path="/projects/:id" render={() => <ProjectPage />} />
          <Route exact path="/projects/:id/edit" render={() => <ProjectEditForm />} />
          <Route exact path="/tasks/create" render={() => <TaskCreateForm />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
