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
import Note from "../../components/Note";
import Task from "../tasks/Task";


function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [notes, setNotes] = useState({ results: [] });
  const [tasks, setTasks] = useState({ results: [] });


  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: project }, { data: notes }, { data: tasks }] = await Promise.all([
          axiosReq.get(`/projects/${id}`),
          axiosReq.get(`/notes/?project=${id}`),
          axiosReq.get(`/tasks/?project=${id}`),
        ]);
        setProject({ results: [project] });
        setNotes(notes);
        setTasks(tasks);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);
  console.log(tasks)
  console.log(tasks.results[3])

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
          </Container>
        </Col>
      </Row>
      <Row className="h-100">
        <Col>
          <div className="bg-light p-2">
            {tasks.results.length ? (
              tasks.results.map((task) => (
                <Task
              task={task}
              />
              ))
              
            
            ) : (
              <span>No tasks yet</span>
            )}
           
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ProjectPage;
