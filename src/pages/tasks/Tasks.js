import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

const Tasks = () => {
  const currentUser = useCurrentUser();
  const owner = currentUser?.username;
  const [tasks, setTasks] = useState({ results: [] });

  console.log(owner);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks`);
        setTasks(data);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
    console.log(currentUser);
  }, [owner]);
  console.log(tasks);

  return (
    <>
      <Row className="h-100">
        <Col>
          <div className="bg-light p-2">
            <Col>
              <div className="card-body">
                <h2>Your Tasks To Do</h2>
                <div className="card mb-2">
                  {tasks.results.length ? (
                    tasks.results
                      .filter((task) => task.task_status === "todo")
                      .map((task) => (
                        <>
                          <Link to={`/tasks/${task.id}`}>
                            <Card>
                              <Card.Body>
                                <Card.Title>Task: {task.task}</Card.Title>
                                <Card.Text>
                                  Description: {task.description}
                                </Card.Text>
                                <Card.Text>
                                  Priority: {task.task_priority}
                                </Card.Text>
                                <Card.Text>Notes: {task.notes_count}</Card.Text>
                              </Card.Body>
                            </Card>
                          </Link>
                        </>
                      ))
                  ) : (
                    <span>Add Task</span>
                  )}
                </div>
              </div>
            </Col>
            <Col>
              <div className="card-body">
                <h2>Your Tasks In Progress</h2>
                <div className="card mb-2">
                  {tasks.results.length ? (
                    <InfiniteScroll
                    
                    dataLength={tasks.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!tasks.next}
                    next={() => fetchMoreData(tasks, setTasks)}
                    height={400}
                    >
                    {
                      tasks.results
                        .filter((task) => task.task_status === "in progress")
                        .map((task) => (
                          <>
                            <Link to={`/tasks/${task.id}`}>
                              <Card>
                                <Card.Body>
                                  <Card.Title>Task: {task.task}</Card.Title>
                                  <Card.Text>
                                    Description: {task.description}
                                  </Card.Text>
                                  <Card.Text>
                                    Priority: {task.task_priority}
                                  </Card.Text>
                                  <Card.Text>Notes: {task.notes_count}</Card.Text>
                                </Card.Body>
                              </Card>
                            </Link>
                          </>
                        ))
                      }
                    </InfiniteScroll>
                  ) : (
                    <span>Add Task</span>
                  )}
                </div>
              </div>
            </Col>
            <Col>
              <div className="card-body">
                <h2>Your Completed Tasks</h2>
                <div className="card mb-2">
                  {tasks.results.length ? (
                    tasks.results
                      .filter((task) => task.task_status === "completed")
                      .map((task) => (
                        <>
                          <Link to={`/tasks/${task.id}`}>
                            <Card>
                              <Card.Body>
                                <Card.Title>Task: {task.task}</Card.Title>
                                <Card.Text>
                                  Description: {task.description}
                                </Card.Text>
                                <Card.Text>
                                  Priority: {task.task_priority}
                                </Card.Text>
                                <Card.Text>Notes: {task.notes_count}</Card.Text>
                              </Card.Body>
                            </Card>
                          </Link>
                        </>
                      ))
                  ) : (
                    <span>Add Task</span>
                  )}
                </div>
              </div>
            </Col>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Tasks;
