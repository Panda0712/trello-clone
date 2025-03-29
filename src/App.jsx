import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import NotFound from "~/pages/404/NotFound";
import AccountVerification from "~/pages/Auth/AccountVerification";
import Auth from "~/pages/Auth/Auth";
import Boards from "~/pages/Boards";
import Settings from "~/pages/Settings/Settings";
import { selectCurrentUser } from "~/redux/user/userSlice";
import Board from "./pages/Boards/_id";

const ProtectedRoutes = ({ user }) => {
  if (!user) return <Navigate to="/login" replace={true} />;
  return <Outlet />;
};

function App() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <Routes>
      {/* Navigate home page */}
      <Route path="/" element={<Navigate to="/boards" replace={true} />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes user={currentUser} />}>
        {/* Board details */}
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:boardId" element={<Board />} />

        {/* User Route */}
        <Route path="/settings/account" element={<Settings />} />
        <Route path="/settings/security" element={<Settings />} />
      </Route>

      {/* Authentication */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/account/verification" element={<AccountVerification />} />

      {/* 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
