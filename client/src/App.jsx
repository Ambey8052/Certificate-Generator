import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Generate from "./pages/Generate";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Verify from "./pages/Verify";

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
      </div>
    );
  }

  return user ? element : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/generate", element: <Generate /> },
  { path: "/verify/:certificateId", element: <Verify /> },
  { path: "/admin", element: <ProtectedRoute element={<Admin />} /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;