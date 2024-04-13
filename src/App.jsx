import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/login";
import SignUp from "./pages/SignUp/SignUp";
import HomePage from "./pages/HomePage/HomePage";
import Cases from "./pages/Cases/Cases";
import Contacts from "./pages/Contacts/Contacts";
import Danger from "./pages/Danger/Danger";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/cases",
      element: <Cases />,
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
    {
      path: "/danger",
      element: <Danger />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
