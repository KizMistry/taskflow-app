import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "../../styles/Project.module.css"

import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";

// import NoteCreateForm from "../notes/NoteCreateForm";
// import { useCurrentUser } from "../../contexts/CurrentUserContext";
// import Note from "../../components/Note";
import Task from "../tasks/Task";
import { Card, Media } from "react-bootstrap";
import { OptionDropdown } from "../../components/OptionDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function TaskPage() {
  const { id } = useParams();
  // const currentUser = useCurrentUser();
  const [notes, setNotes] = useState({ results: [] });
  const [task, setTask] = useState({});

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
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  console.log(task);
  console.log(setTask);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === task.owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/tasks/${id}/edit`);
  };
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/tasks/${id}/`);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Row className="h-100">
        <Col md={12} lg={12}>
          <Card className={styles.Project}>
            <Card.Body>
                <div className="d-flex align-items-center">
                  {is_owner && (
                    <OptionDropdown
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                    />
                  )}
                </div>
            </Card.Body>

            <Card.Body>
              <Card.Title>{task.task}</Card.Title>
              <Card.Text>{task.description}</Card.Text>
              <Card.Text>Priority: {task.task_priority}</Card.Text>
              <Card.Text>Status: {task.task_status}</Card.Text>
              {/* <Card.Text>Notes: {task.notes_count}</Card.Text>
            <Card.Text>File: {task.file}</Card.Text> */}
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
