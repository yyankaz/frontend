import { Box, 
  Input, 
  VStack, 
  Text,
  InputGroup, 
  InputRightElement } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import "./EditBoardModal.css";

export default function EditBoardModal({ board, onClose, onUpdated }) {

  const [boardName, setBoardName] = useState("");
  const [color, setColor] = useState("");
  const length_boardName = boardName.length;

    useEffect(() => {
      if (board) {
        console.log(board)
        setBoardName(board.boardName);
        setColor(board.color);
      }
    }, [board]);

    const updateBoard = async () => {
      console.log("sending color:", color);
  if (!boardName.trim()) return;

  const response = await fetch(`https://to-do-list-project-63o5.onrender.com/boards/${board.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      boardName,
      color: color
    }),
  });
      if (!response.ok) {
      alert("Failed to update board");
      return;
    }

    const updatedBoard = await response.json();

    onUpdated(updatedBoard);
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
            Edit board
          </Text>

          <InputGroup>
          <Input
              placeholder="Board title"
              value={boardName}
              maxLength={50}
              onChange={(e) => setBoardName(e.target.value)}
          />

            <InputRightElement width="39px">
              <Text fontSize="sm">
                {length_boardName}/{50}
              </Text>
            </InputRightElement>
          </InputGroup>

          <Text fontSize="sm" color="gray.500">
            Choose color
          </Text>

            <div className="colors">
              {["YELLOW", "BLUE", "PINK", "GREEN", "PURPLE", "ORANGE"].map(c => (
                <div
                  key={c}
                  className={`color ${c.toLowerCase()} ${color === c ? "selected" : ""}`}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>

          <VStack spacing={4}>
            <div
              className={`slime-btn-create ${!boardName ? "disabled" : ""}`}
              onClick={updateBoard}
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
