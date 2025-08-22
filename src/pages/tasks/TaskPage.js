import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Card } from "react-bootstrap";
import { OptionDropdown } from "../../components/OptionDropdown";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function TaskPage() {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [task, setTask] = useState({});
  const history = useHistory();
  const is_owner = currentUser?.username === task.owner;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/${id}`);
        setTask(data);
      } catch (err) {
        // console.log(err);
      }
    };
    handleMount();
  }, [id]);

  const handleEdit = () => history.push(`/tasks/${id}/edit`);
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/tasks/${id}`);
      history.push("/");
    } catch (err) {
      // console.log(err);
    }
  };

  // Utility for rendering a single task card
  const renderTaskCard = (task) => (
    <Card
      key={task.id}
      className={`Task ${
        task.task_status === "todo"
          ? "ToDo"
          : task.task_status === "in progress"
          ? "InProgress"
          : "Done"
      }`}
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0">{task.task}</Card.Title>
          {is_owner && (
            <OptionDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
          )}
        </div>
        <Card.Text className="mb-2">{task.description}</Card.Text>
        <small className="d-block">Priority: {task.task_priority}</small>
        <small className="d-block">Status: {task.task_status}</small>
      </Card.Body>
    </Card>
  );

  return (
    <Row className="h-100">
      <Col md={4}>
        <h5 className="TaskSectionTitle">To Do</h5>
        {task.task_status === "todo" && renderTaskCard(task)}
      </Col>
      <Col md={4}>
        <h5 className="TaskSectionTitle">In Progress</h5>
        {task.task_status === "in progress" && renderTaskCard(task)}
      </Col>
      <Col md={4}>
        <h5 className="TaskSectionTitle">Done</h5>
        {task.task_status === "done" && renderTaskCard(task)}
      </Col>
    </Row>
  );
}

export default TaskPage;
