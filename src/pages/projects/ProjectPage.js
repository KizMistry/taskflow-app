import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: project }] = await Promise.all([
          axiosReq.get(`/projects/${id}`),
        ]);
        setProject({ results: [project] });
        console.log(project);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Container>
      <Row>
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
    </Container>
  );
}

export default ProjectPage;
