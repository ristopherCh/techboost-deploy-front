import { useEffect, useState } from "react";
import { getAllUsers } from "./modules/userProfileManager";

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  return (
    <>
      <h1>TechBoost</h1>
    </>
  );
};

export default Home;
