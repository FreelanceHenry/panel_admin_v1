import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Login from "./pages/Login";
import { token } from "./Slices/Auth/AuthSlice";
import { useEffect } from "react";
import { useAppSelector } from "./hooks";
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const user = useAppSelector(token);

  const navigate = useNavigate();
  useEffect(() => {
    !user && navigate("/");
  }, [navigate, user]);

  return (
    <>
      {user ? (
        <Dashboard>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Ordenes" element={<Orders />} />
            <Route path="/Productos" element={<Products />} />
            <Route path="/Usuarios" element={<Users />} />
          </Routes>
          <ToastContainer/>
        </Dashboard>
      ) : (
        <div className="flex items-center justify-center w-[100vw] h-[100vh]">
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
