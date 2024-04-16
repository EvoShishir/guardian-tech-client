import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/login";
import SignUp from "./pages/SignUp/SignUp";
import HomePage from "./pages/HomePage/HomePage";
import Cases from "./pages/Cases/Cases";
import Contacts from "./pages/Contacts/Contacts";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SingleArea from "./pages/SingleArea/SingleArea";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/cases",
      element: <Cases />,
    },
    {
      path: "/cases/:area",
      element: <SingleArea />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/contacts",
      element: <Contacts />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
