import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from "reactstrap";
import ApplicationViews from "./components/ApplicationViews";
import Header from "./components/Header";
import { me, onLoginStatusChange } from "./modules/authManager";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      me().then(setUser);
    }
  }, [isLoggedIn]);

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <Router>
      <Header user={user} isLoggedIn={isLoggedIn} />
      <ApplicationViews user={user} isLoggedIn={isLoggedIn} />
    </Router>
  );
} 

export default App;

// "@fortawesome/fontawesome-svg-core": "^6.4.0",
// "@fortawesome/free-brands-svg-icons": "^6.4.0",
// "@fortawesome/free-regular-svg-icons": "^6.4.0",
// "@fortawesome/free-solid-svg-icons": "^6.4.0",
// "@fortawesome/react-fontawesome": "^0.2.0",