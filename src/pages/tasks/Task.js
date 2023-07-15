import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Task = (props) => {
  const {
    id,
    owner,
    notes_count,
    task,
    description,
    task_priority,
    task_status,
    file,
    setTasks,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const taskCard = (
    <>
      <Link to={`/tasks/${task.id}`}>
        <Card>
          <Card.Body>
            <Card.Title>{task.task}</Card.Title>
            <Card.Text>{task.description}</Card.Text>
            <Card.Text>Priority: {task.task_priority}</Card.Text>
            {/* <Card.Text>Notes: {task.notes_count}</Card.Text>
            <Card.Text>File: {task.file}</Card.Text> */}
          </Card.Body>
        </Card>
      </Link>
    </>
  );

  return <>{currentUser && taskCard}</>;
};

export default Task;
