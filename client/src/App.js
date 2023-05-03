import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from "reactstrap";
import ApplicationViews from "./components/ApplicationViews";
import Header from "./components/Header";
import { onLoginStatusChange } from "./modules/authManager";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <Router>
      <Header />
      <ApplicationViews isLoggedIn={isLoggedIn} />
    </Router>
  );
}

export default App;
