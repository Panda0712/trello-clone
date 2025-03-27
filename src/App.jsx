import { Navigate, Route, Routes } from "react-router-dom";
import Board from "./pages/Boards/_id";
import NotFound from "~/pages/404/NotFound";
import Auth from "~/pages/Auth/Auth";

function App() {
  return (
    <Routes>
      {/* Navigate home page */}
      <Route
        path="/"
        element={
          <Navigate to="/boards/67dc23b5ecbf6cc167bb117d" replace={true} />
        }
      />

      {/* Board details */}
      <Route path="/boards/:boardId" element={<Board />} />

      {/* Authentication */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />

      {/* 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
