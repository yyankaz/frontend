import { Box, Input, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import "./CreateTaskModal.css";

export default function CreateTaskModal({ boardId, onClose, onCreated }) {
  const [taskDescription, setTaskDescription] = useState("");
  const [finished] = useState(false);

  const createTask = async () => {
  if (!taskDescription.trim()) return;

  const response = await fetch("https://to-do-list-project-63o5.onrender.com/tasks/create", {
    method: "POST",
   headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      taskDescription,
      finished,
      boardId: Number(boardId),
    }),
  });

  if (response.ok) {
    const createdTask = await response.json();
    onCreated(createdTask);
    onClose();
  } else {
    alert("Task's creation error.");
  }
};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <Box
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <VStack spacing={4}>
          <Text fontSize="lg" fontWeight="bold">
            Create task
          </Text>

          <Input
              placeholder="Task description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />


          <VStack spacing={4}>
            <div
              className={`slime-btn-create ${!taskDescription ? "disabled" : ""}`}
              onClick={createTask}
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