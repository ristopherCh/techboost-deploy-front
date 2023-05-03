import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Home";
import Login from "./Login";
import Register from "./Register";
import ResourceList from "./Resources/ResourcesList";

const ApplicationViews = ({ isLoggedIn }) => {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="resources" element={<ResourceList />} />
      </Route>
    </Routes>
  );
};

export default ApplicationViews;
