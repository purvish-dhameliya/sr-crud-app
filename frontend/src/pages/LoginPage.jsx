import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import LabelBox from "../components/LabelBox";
import InputBox from "../components/InputBox";
import ButtonBox from "../components/ButtonBox";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900">Login</h1>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <LabelBox htmlFor="email">Email</LabelBox>
              <InputBox
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <LabelBox htmlFor="password">Password</LabelBox>
              <InputBox
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <ButtonBox type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Login"}
            </ButtonBox>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <p className="mt-2 text-sm text-gray-600">
            Don`t have an account?{" "}
            <Link to="/register" className="text-indigo-600">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
