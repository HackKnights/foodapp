import React, { useState } from 'react';
import firebase from 'firebase/compat/app'; // Updated import statement
import 'firebase/compat/firestore'; // Updated import statement
import { initializeApp } from 'firebase/app'; // Added import statement for initializeApp

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBS7VH0pNSwirl8m9-PEUsMFRnZQdx1ueE",
    authDomain: "foodapp-ba1f3.firebaseapp.com",
    projectId: "foodapp-ba1f3",
    storageBucket: "foodapp-ba1f3.appspot.com",
    messagingSenderId: "185725571580",
    appId: "1:185725571580:web:2bd58f845466bcc4906279",
    measurementId: "G-1DXB5NHETH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
firebase.initializeApp(firebaseConfig); // Removed duplicate initialization
const db = firebase.firestore();

const Home = () => {
  const [selectedMeat, setSelectedMeat] = useState('');
  const [selectedSeasoning, setSelectedSeasoning] = useState('');
  const [selectedFriedRiceOption, setSelectedFriedRiceOption] = useState('');
  const [selectedTofu, setSelectedTofu] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Post order to Firestore
      const docRef = await db.collection('orders').add({
        meat: selectedMeat,
        seasoning: selectedSeasoning,
        friedRiceOption: selectedFriedRiceOption,
        tofu: selectedTofu,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      // Display unique order ID to the user
      alert(`Your order has been placed! Order ID: ${docRef.id}`);
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('An error occurred while placing your order. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Welcome to Our Restaurant</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="meat">Select Meat:</label>
          <select id="meat" value={selectedMeat} onChange={(e) => setSelectedMeat(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="pork">Pork</option>
            <option value="chicken">Chicken</option>
            <option value="beef">Beef</option>
            <option value="chives with eggs">Chives with Eggs</option>
          </select>
        </div>
        <div>
          <label htmlFor="seasoning">Select Seasoning:</label>
          <select id="seasoning" value={selectedSeasoning} onChange={(e) => setSelectedSeasoning(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="friedRiceOption">Select Fried Rice Option:</label>
          <select id="friedRiceOption" value={selectedFriedRiceOption} onChange={(e) => setSelectedFriedRiceOption(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="chicken">Chicken</option>
            <option value="eggs">Eggs</option>
            <option value="soy sauce">Soy Sauce</option>
          </select>
        </div>
        <div>
          <label htmlFor="tofu">Tofu:</label>
          <input id="tofu" type="checkbox" checked={selectedTofu} onChange={(e) => setSelectedTofu(e.target.checked)} />
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Home;
