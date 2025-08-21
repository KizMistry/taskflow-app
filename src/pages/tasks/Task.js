import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Link from "react-router-dom/Link";

const Task = (props) => {
  const { task } = props;
  const currentUser = useCurrentUser();

  // status → css class (for task.css)
  let statusClass = "";
  if (task?.task_status === "todo") statusClass = "ToDo";
  if (task?.task_status === "in progress") statusClass = "InProgress";
  if (task?.task_status === "completed") statusClass = "Done";

  const taskCard = (
    <>
      <Link to={`/tasks/${task.id}`} style={{ textDecoration: "none" }}>
        <Card className={`Task ${statusClass}`}>
          <Card.Body>
            <Card.Title className="mb-2">{task.task}</Card.Title>
            <Card.Text className="mb-1">{task.description}</Card.Text>
            <small className="d-block">Priority: {task.task_priority}</small>
            {/* <small className="d-block">Notes: {task.notes_count}</small> */}
          </Card.Body>
        </Card>
      </Link>
    </>
  );

  return <>{currentUser && taskCard}</>;
};

export default Task;
