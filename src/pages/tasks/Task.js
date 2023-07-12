import React from "react";
import styles from "../../styles/Project.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Col, Row } from "react-bootstrap";

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

  const getTaskStatusColor = (status) => {
    switch (status) {
      case "todo":
        return styles.ToDo;
      case "in_progress":
        return styles.InProgress;
      case "done":
        return styles.Done;
      default:
        return "";
    }
  };

  return (
      <Card className={styles.Project}>
        <Card.Body>
            <Card.Title>{task.task}</Card.Title>
            <Card.Text>{task.description}</Card.Text>
            <Card.Text>{task.task_priority}</Card.Text>
            <Card.Text>{task.task_status}</Card.Text>
            <Card.Text>{task.file}</Card.Text>
            
            {/* <Col>
              <div className={styles.Column}>
                <h2>To Do</h2>
                {task_status === "todo" && (
                  <div className={getTaskStatusColor(task_status)}>
                    <div className="card mb-2" draggable>
                      <div className="card-body">{task}</div>
                    </div>
                  </div>
                )}
              </div>
            </Col>
            <Col>
              <div className={styles.Column}>
                <h2>In Progress</h2>
                {task_status === "in_progress" && (
                  <div className={getTaskStatusColor(task_status)}>
                    <div className="card mb-2" draggable>
                      <div className="card-body">{task}</div>
                    </div>
                  </div>
                )}
              </div>
            </Col>
            <Col>
              <div className={styles.Column}>
                <h2>Done</h2>
                {task_status === "done" && (
                  <div className={getTaskStatusColor(task_status)}>
                    <div className="card mb-2" draggable>
                      <div className="card-body">{task}</div>
                    </div>
                  </div>
                )}
              </div>
            </Col> */}
        </Card.Body>
      </Card>
  );
};

export default Task;
