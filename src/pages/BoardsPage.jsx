import { useEffect, useState } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Sign from "../assets/Your_Boards_sign.png";
import "./BoardsPage.css";
import CreateBoardModal from "./boards/CreateBoardModal";
import EditBoardModal from "./boards/EditBoardModal";

export default function BoardsPage() {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState(null);

/**
 * Delete board
 * @param {number} boardId - ID of the board to delete
 * @returns {Promise<void>}
 */
const deleteBoard = async (boardId) => {
  await fetch(`http://localhost:8080/boards/${boardId}`, {
    method: "DELETE",
    credentials: "include",
  });

  setBoards(boards.filter(b => b.id !== boardId));
};



  useEffect(() => {
    const fetchBoards = async () => {
      const response = await fetch("http://localhost:8080/boards/all", {
        credentials: "include", 
      });

      if (response.ok) {
        const data = await response.json();
        setBoards(data);
      } else if (response.status === 401) {
        navigate("/login"); 
      }
    };

    fetchBoards();
  }, [navigate]);

    const logout = async () => {
  const response = await fetch("https://localhost:8080/logout", {
    method: "POST",
    credentials: "include",
  });

  if (response.ok) {
    window.location.href = "/login";
  } else {
    console.error("Logout failed");
  }
};

  return (
    <Box
      className="board-page"
      minH="100vh"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <Box
  position="relative"
  width="100%"
  display="flex"
  justifyContent="center"
  alignItems="center"
  mb={4}
>
  <Box
    position="absolute"
    left="0"
  >
    <div
      className="btn-log-out"
      onClick={logout}
    />
  </Box>

  <Image
    src={Sign}
    alt="Your Boards"
    maxW="400px"
  />

</Box>
      <div className="slime-btn-new-board" onClick={() => setIsCreateOpen(true)}></div>
      {isCreateOpen && (
        <CreateBoardModal
          onClose={() => setIsCreateOpen(false)}
          onCreated={(newBoard) =>
            setBoards(prev => [...prev, newBoard])
          }
        />
      )}
      {editingBoard && (
        <EditBoardModal
        board={editingBoard}
        onClose={() => setEditingBoard(null)}
        onUpdated={(updatedBoard) =>
          setBoards(prev =>
          prev.map(b =>
          b.id === updatedBoard.id ? updatedBoard : b
          )
        )
      }
      />
      )}

      {boards.length === 0 ? (
        <Text>You don't have boards yet. Create a new one!</Text>
      ) : (
        <div className="boards-grid">
  {boards.map(board => (
    <div key={board.id} className="board-wrapper">

      <Link
        to={`/boards/${board.id}`}
        className="board-link"
      >
        <div className={`board board--${board.color.toLowerCase()}`}>
          {board.boardName}
        </div>
      </Link>

      <div>
        <button
          className="btn-delete-board"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteBoard(board.id);
          }}
        />
      </div>
        <div>
        <button
          className="btn-edit-board"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setEditingBoard(board);
          }}
        />
      </div>

    </div>
  ))}
</div>
        
      )}
    </Box>
  );
}