import { useEffect, useState } from "react";
import { getAllUsers } from "./modules/userProfileManager";

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  return (
    <div className="m-5">
      <div className="intro-section">
        <h1>Welcome to TechBoost!</h1>
        <h4>Discover, Review, and Rate the Best Tech Tutorials</h4>
        <p>
          Are you eager to enhance your skills in JavaScript, Python, Java,
          HTML/CSS, algorithms, and other web development and computer science
          concepts? Look no further! Our platform is designed to be your
          ultimate resource for all things tech tutorials.
        </p>
        <p>
          Whether you're a beginner starting your coding journey or an
          experienced developer looking to expand your knowledge, our website is
          here to empower you. We provide a centralized hub where you can
          explore, share, and contribute to a vast collection of tech tutorials
          from various sources, including online courses, books, video series,
          websites, and more.
        </p>
        <p>Here's what you can do on our platform:</p>
        <ul>
          <li>
            Discover a Plethora of Tutorials: Browse through our extensive
            library of tech tutorials covering a wide range of topics. Unleash
            your curiosity and explore new learning opportunities tailored to
            your interests and skill level.
          </li>
          <li>
            Read and Write Reviews: Dive into insightful reviews written by
            fellow learners who have experienced these tutorials firsthand.
            Share your own thoughts, opinions, and experiences by writing
            reviews to help others make informed decisions.
          </li>
          <li>
            Rate Tutorials: Rate the tutorials based on their quality,
            comprehensiveness, and effectiveness. Your ratings will contribute
            to a collective rating system, guiding other users to find the
            highest-rated tutorials in their desired subjects.
          </li>
          <li>
            Contribute Your Own Tutorials: Are you passionate about teaching and
            sharing your knowledge? Become a valued member of our community by
            contributing your own tutorials. Help aspiring learners find
            valuable resources and make a positive impact in their learning
            journeys.
          </li>
        </ul>
        <p>
          Join our growing community of tech enthusiasts, lifelong learners, and
          industry professionals. Together, let's unlock the endless
          possibilities of learning and advance our skills in the exciting world
          of technology.
        </p>
        <p>
          Start exploring, reviewing, and rating the best tech tutorials today!
        </p>
        <p>Happy Learning!</p>
        <p>Best regards,</p>
        <img
          className="signature"
          src="https://i.imgur.com/cRLoc0b.jpg"
          alt="Signature"
        />
        <p>Chris Hanson</p>
        <p>Creator of TechBoost</p>
      </div>
    </div>
  );
};

export default Home;
