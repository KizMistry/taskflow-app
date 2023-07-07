import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";

function ProjectPage() {
  // Add your logic here


  return (
    <Container>
      <Row>
        <Col>
          <div
            className="bg-light p-2"

          >
            <h2>To Do</h2>

                <div
                  key="task.id"
                  className="card mb-2"
                  draggable
                >
                  <div className="card-body">task.title</div>
                </div>

          </div>
        </Col>
        <Col>
          <div
            className="bg-light p-2"

          >
            <h2>In Progress</h2>
            
                <div
                  key="{task.id}"
                  className="card mb-2"
                  draggable

                >
                  <div className="card-body">task.title</div>
                </div>
          
          </div>
        </Col>
        <Col>
          <div
            className="bg-light p-2"

          >
            <h2>Done</h2>
          
                <div
                  key="{task.id}"
                  className="card mb-2"
                  draggable
                >
                  <div className="card-body">task.title</div>
                </div>
             
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectPage;