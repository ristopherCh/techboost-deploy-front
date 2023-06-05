import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Home";
import Login from "./Login";
import Register from "./Register";
import ResourceList from "./Resources/ResourceList";
import ResourceDetails from "./Resources/ResourceDetails";
import ResourceForm from "./Resources/ResourceForm";
import ResourceEdit from "./Resources/ResourceEdit";
import ResourceBrowse from "./Resources/ResourceBrowse";
import ReviewsList from "./Reviews/ReviewsList";
import ReviewEdit from "./Reviews/ReviewEdit";
import ReviewAdd from "./Reviews/ReviewAdd";
import ReviewUserList from "./Reviews/ReviewUserList";

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
        <Route path="reviews/user" element=<ReviewUserList /> />
        <Route path="resources">
          <Route index element={<ResourceList />} />
          <Route path="subjects/:subject" element=<ResourceList /> />
          <Route path="mediaTypes/:mediaType" element=<ResourceList /> />
          <Route path="creators/:creator" element=<ResourceList /> />
          <Route path="search/:searchTerm" element=<ResourceList /> />
          <Route path="users/:user" element=<ResourceList /> />
          <Route path=":resourceId/addreview" element=<ReviewAdd /> />
          <Route path=":resourceId/editreview" element=<ReviewEdit /> />
          <Route path=":resourceId/allreviews" element=<ReviewsList /> />
          <Route path="browse" element={<ResourceBrowse />} />
          <Route path="details/:id">
            <Route index element={<ResourceDetails />} />
            <Route path="edit" element={<ResourceEdit />} />
          </Route>
          <Route path="create" element={<ResourceForm />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default ApplicationViews;
