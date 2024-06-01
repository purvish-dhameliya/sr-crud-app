import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/dashboard">
        <h2>SRANALYTICS APP</h2>
      </Link>
      {user && (
        <div className="flex items-center space-x-4">
          <Link to="/tasks" className="text-white">
            Tasks
          </Link>
          <Link to="/users" className="text-white">
            Users
          </Link>
        </div>
      )}

      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="text-white p-2 rounded-md bg-red-400"
          >
            Logout
          </button>
        ) : (
          <div>
            <Link to="/login" className="text-white mr-4">
              Login
            </Link>
            <Link to="/register" className="text-white">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
