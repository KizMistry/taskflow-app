import React from "react";
import styles from "../../styles/Project.module.css";
import Media from "react-bootstrap/Media";
import Card from "react-bootstrap/Card";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { OptionDropdown } from "../../components/OptionDropdown";
import { axiosRes } from "../../api/axiosDefaults";

const Project = (props) => {
  const {
    id,
    owner,
    tasks_count,
    notes_count,
    title,
    description,
    updated_at,
    projectPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/projects/${id}/edit`);
  };
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/projects/${id}/`);
      history.push("/");
    } catch (err) {
      // console.log(err);
    }
  };
  return (
    <Card className={styles.Project}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && projectPage && (
              <OptionDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>

      <Card.Body>
        <Link to={`/projects/${id}`}>
          {title && <Card.Title className="text-center">{title}</Card.Title>}
          {description && <Card.Text>{description}</Card.Text>}
          <i className="fa-solid fa-list-check" />
          {tasks_count}
          <i className="fa-regular fa-note-sticky" />
          {notes_count}
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Project;
