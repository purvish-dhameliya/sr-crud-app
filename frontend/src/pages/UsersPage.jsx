import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  updateUser,
  deleteUser,
} from "../features/users/userSlice";
import InputBox from "../components/InputBox";
import ButtonBox from "../components/ButtonBox";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userSchema } from "../utils/validations";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleCreateUser = async () => {
    try {
      await userSchema.validate(
        { username, email, password },
        { abortEarly: false }
      );
      dispatch(createUser({ username, email, password }));
      toast.success("User created successfully");
      clearForm();
    } catch (error) {
      error.inner.forEach((err) => {
        if (err.path === "username") setUsernameError(err.message);
        if (err.path === "email") setEmailError(err.message);
        if (err.path === "password") setPasswordError(err.message);
      });
    }
  };

  const handleUpdateUser = () => {
    dispatch(
      updateUser({ id: editingUser._id, userData: { username, email } })
    );
    toast.success("User updated successfully");
    clearForm();
  };

  const handleDeleteUser = (id) => {
    try {
      dispatch(deleteUser(id));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const clearForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError(e.target.value.trim() ? "" : "Username is required");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(e.target.value.trim() ? "" : "Email is required");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(e.target.value.trim() ? "" : "Password is required");
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Users</h1>

      <div className="w-full md:w-1/2 mx-auto">
        <div className="bg-white shadow rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {editingUser ? "Edit User" : "Add User"}
          </h2>
          <InputBox
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            className="w-full p-2 mb-2 border rounded"
          />
          {usernameError && (
            <p className="text-sm text-red-500">{usernameError}</p>
          )}
          <InputBox
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-full p-2 mb-2 border rounded"
          />
          {emailError && <p className="text-sm text-red-500">{emailError}</p>}
          {!editingUser && (
            <>
              <InputBox
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full p-2 mb-2 border rounded"
              />
              {passwordError && (
                <p className="text-sm text-red-500">{passwordError}</p>
              )}
            </>
          )}
          <div className="flex justify-between items-center">
            <ButtonBox
              onClick={editingUser ? handleUpdateUser : handleCreateUser}
              className="w-full p-2 bg-green-700 text-white rounded hover:bg-green-500 mr-2"
            >
              {editingUser ? "Update User" : "Create User"}
            </ButtonBox>
            {editingUser && (
              <ButtonBox
                onClick={() => {
                  setEditingUser(null);
                  clearForm();
                }}
                className="w-full p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </ButtonBox>
            )}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">User List</h2>
          {loading ? (
            <p className="text-lg">Loading...</p>
          ) : error ? (
            <p className="text-lg text-red-500">{error}</p>
          ) : (
            <ul className="space-y-4">
              {users.map((user) => (
                <li
                  key={user._id}
                  className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <span className="text-lg">UserName: {user.username}</span>
                    <br />
                    <span className="text-lg">Email: {user.email}</span>
                  </div>
                  <div className="flex space-x-2">
                    <ButtonBox
                      onClick={() => {
                        setEditingUser(user);
                        setUsername(user.username);
                        setEmail(user.email);
                      }}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </ButtonBox>
                    <ButtonBox
                      onClick={() => handleDeleteUser(user._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </ButtonBox>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
