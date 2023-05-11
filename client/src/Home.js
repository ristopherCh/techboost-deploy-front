import { useEffect, useState } from "react";
import { getAllUsers } from "./modules/userProfileManager";

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center height-250">
      <h1>TechBoost</h1>
    </div>
  );
};

export default Home;
