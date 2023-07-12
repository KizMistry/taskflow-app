import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Task from "./Task";

function TaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
        try {
            const [{data: task}] = await Promise.all([
                axiosReq.get(`/tasks/${id}`),
            ])
            setTask({results: [task]})
            console.log(task)
        } catch(err){
            console.log(err)
        }
    }
    handleMount();
  }, [id])


  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={12}>
        <Task {...task.results[0]} setTasks={setTask} taskPage />
        <Container className={appStyles.Content}>
          Notes
        </Container>
      </Col>
    </Row>
  );
}

export default TaskPage;