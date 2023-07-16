import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import appStyles from "../../App.module.css";

const Tasks = () => {
  const currentUser = useCurrentUser();
  const owner = currentUser?.username;
  const [tasks, setTasks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks`);
        setTasks(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchTasks();
  }, [owner]);

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
                  <span>No tasks to display</span>
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
  );
};

export default Tasks;
