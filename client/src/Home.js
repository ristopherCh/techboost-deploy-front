import { useEffect, useState } from "react";
import { getAllUsers } from "./modules/userProfileManager";

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  return (
    <>
      <div>Hi</div>
    </>
  );
};

export default Home;
