import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./ApplicationViews";

function App() {
  return (
    <Router>
      <ApplicationViews />
    </Router>
  );
}

export default App;
