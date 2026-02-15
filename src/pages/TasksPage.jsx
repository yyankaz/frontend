import {
  Box,
  Text,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import "./TasksPage.css";
import CreateTaskModal from "./tasks/CreateTaskModal";
import EditTaskModal from "./tasks/EditTaskModal";

export default function TasksPage() {
const [board, setBoard] = useState(null);
const [tasks, setTasks] = useState([]);
const [editingTask, setEditingTask] = useState(null);
const [isCreateOpen, setIsCreateOpen] = useState(false);

const { boardId } = useParams();

const MotionBox = motion(Box);

/**
 * Returns board using boardId
 * @param {number} boardId - ID of the board
 * @returns {Promise<void>}
 */
useEffect(() => {
  fetch(`https://to-do-list-project-63o5.onrender.com/boards/${boardId}`, {
             headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    }
  })
    .then(res => {
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
    }
    throw new Error("Request failed");
  }
  return res.json();
})
    .then(data => setBoard(data));
}, [boardId]);

/**
 * Returns array of tasks using boardId
 * @param {number} boardId - ID of the board with tasks' array
 * @returns {Promise<void>}
 */
useEffect(() => {
  fetch(`https://to-do-list-project-63o5.onrender.com/tasks/board/${boardId}`, {
       headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    }
  })
    .then(res => {
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
    }
    throw new Error("Request failed");
  }
  return res.json();
})
    .then(data => {
        console.log("tasks:", data);
        setTasks(Array.isArray(data) ? data : []);
      });;
}, [boardId]);

/**
 * Toggles task completion status
 * @param {number} taskId - ID of the task to update
 * @returns {Promise<void>}
 */
const toggleTaskFinished = async (taskId) => {

  const response = await fetch(
    `https://to-do-list-project-63o5.onrender.com/tasks/${taskId}/toggle`,
    {
      method: "PATCH",
         headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
    }
  );

  if (!response.ok) {
    alert("Failed to update task");
    return;
  }

  const updatedTask = await response.json();

  setTasks(prev =>
    prev.map(task =>
      task.id === taskId ? updatedTask : task
    )
  );
};

/**
 * Delete task
 * @param {number} taskId - ID of the task to delete
 * @returns {Promise<void>}
 */
const deleteTask = async (taskId) => {
  await fetch(`https://to-do-list-project-63o5.onrender.com/tasks/${taskId}`, {
    method: "DELETE",
       headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  });

  setTasks(tasks.filter(t => t.id !== taskId));
};


/**
 * Show loading state while board data is being fetched.
 * Prevents rendering page before required data is available.
 */
if (!board) {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <MotionBox
        display="flex"
        alignItems="center"
        gap="24px"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >

        <Text
          fontSize="32px"
          fontWeight="700"
          color="purple.500"
        >
          Loading board...
        </Text>
      </MotionBox>
    </Box>
  );
}



  return (
    <Box
    className={`background back--${board?.color?.toLowerCase() || "pink"}`}
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bg="white"
        p={8}
        rounded="md"
        shadow="md"
        width="1000px"
      >
              <div className="slime-btn-new-task" onClick={() => setIsCreateOpen(true)}></div>
              {isCreateOpen && (
                <CreateTaskModal
                  boardId={boardId}
                  onClose={() => setIsCreateOpen(false)}
                  onCreated={(newTask) =>
                    setTasks(prev => [...prev, newTask])
                  }
                />
              )}
        {tasks.length === 0 ? (
        <Text>You don't have tasks yet. Create a new one!</Text>
      ) : (
        <div >
          {tasks.map(task => (
            <div
              key={task.id}
              className={`task-item ${task.finished ? "finished" : ""}`}
                            onClick={() => toggleTaskFinished(task.id)}
            >
              <span className="task-icon" />
              <span className="task-text">{task.taskDescription}</span>
                <div className="task-actions">
    <button className="btn-edit" onClick={(e) => {
                  e.stopPropagation();
                  setEditingTask(task);
                }}></button>
    <button className="btn-delete" onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}></button>
  </div>
            </div>
          
          ))}
          
        </div>
        
      )}

                    {editingTask && (
                <EditTaskModal
                  task={editingTask}
                  onClose={() => setEditingTask(null)}
                  onUpdated={(updatedTask) =>
                    setTasks(prev =>
                      prev.map(t =>
                        t.id === updatedTask.id ? updatedTask : t
                      )
                    )
                  }
                />
              )}
    </Box>
    </Box>
  );
};
