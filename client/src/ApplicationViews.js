import { Routes, Route } from "react-router-dom";
import Home from "./Home";

const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />}></Route>
      </Route>
    </Routes>
  );
};

export default ApplicationViews;
