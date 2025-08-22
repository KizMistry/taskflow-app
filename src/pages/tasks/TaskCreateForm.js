import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Alert from "react-bootstrap/Alert"
import { useHistory } from "react-router-dom";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/TaskCreateEditForm.module.css";

import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom/cjs/react-router-dom";

function TaskCreateForm() {
  const [errors, setErrors] = useState();
  const history = useHistory();
  
  
  const projectId = useParams();

  const [taskData, setTaskData] = useState({
    task: "",
    description: "",
    file: "",
    task_priority: "low",
    task_status: "todo",
  });
  const { task, description, file, task_priority, task_status } = taskData;

  // const fileInput = useRef(null);

  // const handleChangeFile = (event) => {
  //   if (event.target.files.length) {
  //     const selectedFile = event.target.files[0];
  //     URL.revokeObjectURL(file);
  //     setTaskData({
  //       ...taskData,
  //       file: URL.createObjectURL(selectedFile),
  //       selectedFile: selectedFile,
  //     });
  //   }
  // };

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("project", projectId.id);
    formData.append("task", task);
    formData.append("description", description);
    formData.append("task_priority", task_priority);
    formData.append("task_status", task_status);

    // if (fileInput.current.files.length > 0) {
    //   formData.append("file", fileInput.current.files[0]);
    // }

    try {
      await axiosReq.post("/tasks/", formData);
      history.goBack()
    } catch (err) {
      // console.log(err.response);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Task</Form.Label>
        <Form.Control
          type="text"
          name="task"
          value={task}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.task?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Priority</Form.Label>
        <Form.Control
          as="select"
          name="task_priority"
          value={taskData.task_priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Form.Control>
      </Form.Group>
      {errors?.task_priority?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          name="task_status"
          value={taskData.task_status}
          onChange={handleChange}
        >
          <option value="todo">ToDo</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </Form.Control>
      </Form.Group>
      {errors?.task_status?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={12} lg={12} className="d-md-block p-0 p-md-2">
          <Container className={`${appStyles.Content} ${styles.Container}`}>
  {textFields}
</Container>
        </Col>
        {/* <Container
          className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
        >
          <Form.Group className="text-center">
            {file ? (
              <>
                <figure>
                  <Image className={appStyles.Image} src={file} rounded />
                </figure>
                <div>
                  <Form.Label
                    className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                    htmlFor="file-upload"
                  >
                    Change the file
                  </Form.Label>
                </div>
              </>
            ) : (
              <Form.Label
                className="d-flex justify-content-center"
                htmlFor="file-upload"
              >
                <Asset src={Upload} message="Click or tap to upload a file" />
              </Form.Label>
            )}

            <Form.File
              id="file-upload"
              accept="file/*"
              onChange={handleChangeFile}
              ref={fileInput}
            />
          </Form.Group>
          {errors?.file?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <div className="d-md-none">{textFields}</div>
        </Container> */}
      </Row>
    </Form>
  );
}

export default TaskCreateForm;
