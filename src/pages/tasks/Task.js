import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Link from "react-router-dom/Link";

const Task = (props) => {
  const {
    task,
  } = props;

  const currentUser = useCurrentUser();

  const taskCard = (
    <>
      <Link to={`/tasks/${task.id}`}>
        <Card>
          <Card.Body>
            <Card.Title>{task.task}</Card.Title>
            <Card.Text>{task.description}</Card.Text>
            <Card.Text>Priority: {task.task_priority}</Card.Text>
            {/* <Card.Text>Notes: {task.notes_count}</Card.Text>*/}
          </Card.Body>
        </Card>
      </Link>
    </>
  );

  return <>{currentUser && taskCard}</>;
};

export default Task;
