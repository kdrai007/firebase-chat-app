import Home from "./pages/Home";
import Register from "./pages/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import "./styles/index.css";
import Login from "./pages/Login";
import { useAuthContext } from "./context/AuthContext";

function App() {
  // const { currentUser } = useAuthContext();
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <main className="main-page">
          <Home />
        </main>
      ),
    },
    {
      path: "/register",
      element: (
        <main className="main-page">
          <Register />
        </main>
      ),
    },
    {
      path: "/login",
      element: (
        <main className="main-page">
          <Login />
        </main>
      ),
    },
  ]);
  return (
    //   <main className="main-page">
    //     {/* <Home /> */}
    //     <Register />
    //   </main>

    <RouterProvider router={router} />
  );
}

export default App;
