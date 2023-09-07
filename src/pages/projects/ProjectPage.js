import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import Card from "react-bootstrap/Card";

import appStyles from "../../App.module.css";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Project from "./Project";

import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState({ results: [] });
  const [notes, setNotes] = useState({ results: [] });
  const [tasks, setTasks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: project }, { data: notes }, { data: tasks }] =
          await Promise.all([
            axiosReq.get(`/projects/${id}`),
            axiosReq.get(`/notes/?project=${id}`),
            axiosReq.get(`/tasks/?project=${id}`),
          ]);
        setProject({ results: [project] });
        setNotes(notes);
        setTasks(tasks);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    setHasLoaded(false);
    handleMount();
  }, [id]);

  const TaskCard = ({ task }) => {
    return (
      <Link to={`/tasks/${task.id}`}>
        <Card>
          <Card.Body>
            <Card.Title>Task: {task.task}</Card.Title>
            <Card.Text>Description: {task.description}</Card.Text>
            <Card.Text>Priority: {task.task_priority}</Card.Text>
            <Card.Text>Notes: {task.notes_count}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    );
  };

  const TaskSection = ({ title, taskStatus, tasks, hasLoaded }) => {
    const filteredTasks = tasks.results.filter(
      (task) => task.task_status === taskStatus
    );

    return (
      <Col>
        <div className="card-body">
          <h2>{title}</h2>
          <div className="card mb-2">
            {hasLoaded ? (
              <>
                {filteredTasks.length ? (
                  <InfiniteScroll
                    dataLength={filteredTasks.length}
                    loader={<Asset spinner />}
                    hasMore={!!tasks.next}
                    next={() => fetchMoreData(tasks, setTasks)}
                    height={400}
                  >
                    {filteredTasks.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </InfiniteScroll>
                ) : (
                  <span className={appStyles.tasksSpan}>No tasks to display</span>
                )}
              </>
            ) : (
              <Container className={appStyles.Content}>
                <Asset spinner />
              </Container>
            )}
          </div>
        </div>
      </Col>
    );
  };

  return (
    <>
      <Row className="h-100">
        <Col md={12} lg={12}>
          <Project
            {...project.results[0]}
            setProjects={setProject}
            projectPage
          />
        </Col>
      </Row>
      <Row className="h-100">
      <Container>
        <Link
          className={appStyles.Center}
          to={`${id}/tasks/create`}
        >
          <i className="fas fa-plus-square"></i>Add Task
        </Link>
        </Container>
      </Row>

      <Row className="h-100">
        <Col>
          <div className="bg-light p-2">
            <TaskSection
              title="Your Tasks To Do"
              taskStatus="todo"
              tasks={tasks}
              hasLoaded={hasLoaded}
            />

            <TaskSection
              title="Your Tasks In Progress"
              taskStatus="in progress"
              tasks={tasks}
              hasLoaded={hasLoaded}
            />

            <TaskSection
              title="Your Completed Tasks"
              taskStatus="completed"
              tasks={tasks}
              hasLoaded={hasLoaded}
            />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ProjectPage;
