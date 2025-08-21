import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "../../styles/Project.module.css";

import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";

import { Card } from "react-bootstrap";
import { OptionDropdown } from "../../components/OptionDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function TaskPage() {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [notes, setNotes] = useState({ results: [] });
  const [task, setTask] = useState({});
  const is_owner = currentUser?.username === task.owner;
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: task }, { data: notes }] = await Promise.all([
          axiosReq.get(`/tasks/${id}`),
          axiosReq.get(`/notes/?tasks=${id}`),
        ]);
        setTask(task);
        setNotes(notes);
      } catch (err) {
        // console.log(err);
      }
    };
    handleMount();
  }, [id]);

  const handleEdit = () => {
    history.push(`/tasks/${id}/edit`);
  };
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/tasks/${id}`);
      history.push("/");
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      <Row className="h-100">
        <Col md={12} lg={12}>
          <Card className={`Task ${task.task_status === "todo" ? "ToDo" : task.task_status === "in progress" ? "InProgress" : "Done"}`}>
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

          {/* <Container className={appStyles.Content}>
            {currentUser ? (
              <NoteCreateForm
                profile_id={currentUser.profile_id}
                profileImage={profile_image}
                project={id}
                setProject={setProject}
                setNotes={setNotes}
              />
            ) : notes.results.length ? (
              "Notes"
            ) : null}
            {notes.results.length ? (
              notes.results.map((note) => (
                <Note
                  key={note.id}
                  {...note}
                  setProject={setProject}
                  setNotes={setNotes}
                />
              ))
            ) : currentUser ? (
              <span>No notes</span>
            ) : (
              <span>No notes yet</span>
            )}
          </Container> */}
        </Col>
      </Row>
    </>
  );
}

export default TaskPage;
