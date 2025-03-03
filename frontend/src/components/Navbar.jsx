import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [logText, setLogText] = useState("Login");
  const navigate = useNavigate();
  const { token, setToken } = useAuth();
  useEffect(() => {
    if (token) setLogText("Logout");
    else setLogText("Login");
  }, [token]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">MyApp</h1>
        <div className="flex space-x-4">
          <Link to="/dashboard" className="text-white hover:underline">
            Dashboard
          </Link>
          <Link to="/profile" className="text-white hover:underline">
            Profile
          </Link>
          <button
            onClick={token ? handleLogout : handleLogin}
            className="text-white hover:underline"
          >
            {logText}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
