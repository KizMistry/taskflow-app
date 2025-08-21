import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom/cjs/react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
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
        // console.log(err);
      }
    };

    setHasLoaded(false);
    fetchTasks();
  }, [owner]);

  const TaskCard = ({ task }) => {
  let statusClass = "";
  if (task.task_status === "todo") statusClass = "ToDo";
  if (task.task_status === "in progress") statusClass = "InProgress";
  if (task.task_status === "completed") statusClass = "Done";

  return (
    <Link to={`/tasks/${task.id}`} style={{ textDecoration: "none" }}>
      <Card className={`Task ${statusClass}`}>
        <Card.Body>
          <Card.Title className="mb-2">{task.task}</Card.Title>
          <Card.Text className="mb-1">{task.description}</Card.Text>
          <small className="d-block">Priority: {task.task_priority}</small>
          <small className="d-block">Notes: {task.notes_count}</small>
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
      <div className="Column">
        <h2 className="TaskSectionTitle">{title}</h2>
        {hasLoaded ? (
          filteredTasks.length ? (
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
          )
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
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
