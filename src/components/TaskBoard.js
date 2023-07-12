// import React, { useEffect, useState } from "react";
// import { axiosReq } from "../api/axiosDefaults";

// function TaskBoard({ projectId }) {
//   const [tasks, setTasks] = useState({ results: [] });

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const { data: taskData } = await axiosReq.get(`/tasks/?project=${projectId}`);
//         // setTasks({ results: [tasks] });
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchTasks();
//   }, [projectId]);

//   return (
//     <>
//       <h2>To Do</h2>
//       {tasks
//         .filter((task) => task.task_status === "todo")
//         .map((task) => (
//           <div key={task.id} className="card mb-2" draggable>
//             <div className="card-body">{task.task}</div>
//           </div>
//         ))}

//       <h2>In Progress</h2>
//       {tasks
//         .filter((task) => task.task_status === "in progress")
//         .map((task) => (
//           <div key={task.id} className="card mb-2" draggable>
//             <div className="card-body">{task.task}</div>
//           </div>
//         ))}

//       <h2>Done</h2>
//       {tasks
//         .filter((task) => task.task_status === "completed")
//         .map((task) => (
//           <div key={task.id} className="card mb-2" draggable>
//             <div className="card-body">{task.task}</div>
//           </div>
//         ))}
//     </>
//   );
// }

// export default TaskBoard;
