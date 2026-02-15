import { Box, Input, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import "./CreateBoardModal.css";

export default function CreateBoardModal({ onClose, onCreated }) {
  const [boardName, setBoardName] = useState("");
  const [color, setColor] = useState("PINK");

    const createBoard = async () => {
  if (!boardName.trim()) return;

  const response = await fetch("https://to-do-list-project-63o5.onrender.com/boards/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
          boardName,
          color,
        }),
    });

  if (response.ok) {
    const createdBoard = await response.json();
    onCreated(createdBoard);
    onClose();
  } else {
    alert("Board's creation error.");
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
            Create board
          </Text>

          <Input
              placeholder="Board title"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />

          <Text fontSize="sm" color="gray.500">
            Choose color
          </Text>

          <div className="colors">
            {["YELLOW", "BLUE", "PINK", "GREEN", "PURPLE", "ORANGE"].map(c => (
              <div
                key={c}
                className={`color ${c.toLowerCase()} ${
                  color === c ? "selected" : ""
                }`}
                onClick={() => setColor(c)}
              />
            ))}
          </div>

          <VStack spacing={4}>
            <div
              className={`slime-btn-create ${!boardName ? "disabled" : ""}`}
              onClick={createBoard}
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