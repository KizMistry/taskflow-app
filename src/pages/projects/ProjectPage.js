import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Project from "./Project";

import NoteCreateForm from "../notes/NoteCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Note from "../notes/Note";

function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [notes, setNotes] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: project }, {data: notes}] = await Promise.all([
          axiosReq.get(`/projects/${id}`),
          axiosReq.get(`/notes/?project=${id}`)
        ]);
        setProject({ results: [project] });
        setNotes(notes);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <>
      <Row className="h-100">
        <Col md={12} lg={12}>
          <Project
            {...project.results[0]}
            setProjects={setProject}
            projectPage
          />
          <Container className={appStyles.Content}>
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
              notes.results.map(note => (
                <Note key={note.id} {...note} />
              ))
            ) : currentUser ? (
              <span>No notes</span>
            ) : (
              <span>No notes yet</span>
            )}
          </Container>
        </Col>
      </Row>
      <Row className="h-100">
        <Col>
          <div className="bg-light p-2">
            <h2>To Do</h2>

            <div key="task.id" className="card mb-2" draggable>
              <div className="card-body">task.title</div>
            </div>
          </div>
        </Col>
        <Col>
          <div className="bg-light p-2">
            <h2>In Progress</h2>

            <div key="{task.id}" className="card mb-2" draggable>
              <div className="card-body">task.title</div>
            </div>
          </div>
        </Col>
        <Col>
          <div className="bg-light p-2">
            <h2>Done</h2>

            <div key="{task.id}" className="card mb-2" draggable>
              <div className="card-body">task.title</div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ProjectPage;
