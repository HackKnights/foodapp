
import React from 'react';
import { Link } from 'react-router-dom';



const Home = () => {
  return (
    <div>
      <h1>Welcome to Our Restaurant</h1>
      <ul>
        <li><Link to="/About-us">About us</Link></li>
        <li><Link to="/soup">Soup</Link></li>
        <li><Link to="/wonton">Wonton</Link></li>
        <li><Link to="/fried-rice">Fried Rice</Link></li>
        
      </ul>
    </div>
  );
};

export default Home;