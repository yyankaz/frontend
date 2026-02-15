import { Box, Input, VStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import "./EditTaskModal.css";

export default function EditTaskModal({ task, onClose, onUpdated }) {

  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTaskDescription(task.taskDescription);
    }
  }, [task]);

  const updateTask = async () => {

    if (!taskDescription.trim()) return;

    const response = await fetch(
      `https://to-do-list-project-63o5.onrender.com/tasks/${task.id}`,
      {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
          },
        body: JSON.stringify({
          taskDescription,
        }),
      }
    );

    if (!response.ok) {
      alert("Failed to update task");
      return;
    }

    const updatedTask = await response.json();

    onUpdated(updatedTask);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <Box
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <VStack spacing={4}>
          <Text fontSize="lg" fontWeight="bold">
            Edit task
          </Text>

          <Input
              placeholder="Task description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />


          <VStack spacing={4}>
            <div
              className={`slime-btn-create ${!taskDescription ? "disabled" : ""}`}
              onClick={updateTask}
            />
          </VStack>
          <Text
            fontSize="sm"
            color="gray.500"
            cursor="pointer"
            onClick={onClose}
          >
            Cancel
          </Text>
        </VStack>
      </Box>
    </div>

  );
}