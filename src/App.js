import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import BoardsPage from "./pages/BoardsPage"
import RegisterPage from "./pages/RegisterPage"
import TasksPage from "./pages/TasksPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/boards/all" element={<BoardsPage />} />
        <Route path="/user/register" element={<RegisterPage />} />
        <Route path="/boards/:boardId" element={<TasksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;