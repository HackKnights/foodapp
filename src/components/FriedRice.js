import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    // ... your config
};

//const app = initializeApp(firebaseConfig);
//const db = firebase.firestore();


// Initialize Firebase with the configuration object
const app = initializeApp(firebaseConfig);
const db = firebase.firestore();


const FriedRice = () => {
    const [ingredients, setIngredients] = useState({});
    const availableIngredients = [
        { name: 'Chicken', type: 'checkbox' },
        { name: 'Shrimp', type: 'checkbox' },
        { name: 'Egg', type: 'checkbox' },
        { name: 'Vegetables', type: 'checkbox' },
        { name: 'Tofu', type: 'select' }, // Change type to 'select'
    ];
    const quantities = ['Don\'t put it', 'Low', 'Medium', 'High'];

    const handleIngredientChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === 'select') {
            setIngredients({
                ...ingredients,
                [name]: value
            });
        } else if (type === 'checkbox') {
            setIngredients({
                ...ingredients,
                [name]: checked ? 'Yes' : 'No'
            });
        }
    };


const handleFormSubmit = async () => {
    try {
        // Add fried rice data to Firestore
        const docRef = await db.collection('orders').add({
            friedRiceIngredients: ingredients,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Alert the user that their order has been placed
        alert(`Your order has been placed! Order ID: ${docRef.id}`);
    } catch (error) {
        console.error('Error adding document: ', error);
        alert('An error occurred while placing your order. Please try again later.');
    }
};

   //const handleFormSubmit = async (e) => {
   //     e.preventDefault();

      //  try {
       //     const docRef = await db.collection('orders').add({
        //        friedRiceIngredients: ingredients,
         //       timestamp: firebase.firestore.FieldValue.serverTimestamp()
          //  });

           // alert(`Your order has been placed! Order ID: ${docRef.id}`);
       // } catch (error) {
        //    console.error('Error adding document: ', error);
        //    alert('An error occurred while placing your order. Please try again later.');
       // }
    //};

    return (
        <div>
            <h1>Customize Your Fried Rice</h1>
            <h2>Ingredients</h2>
            {availableIngredients.map((ingredient, index) => (
                <div key={index}>
                    <label>
                        {ingredient.name}
                        {ingredient.type === 'checkbox' ? (
                            <input
                                type="checkbox"
                                name={ingredient.name}
                                onChange={handleIngredientChange}
                            />
                        ) : (
                            <select name={ingredient.name} onChange={handleIngredientChange}>
                                {quantities.map((quantity, index) => (
                                    <option key={index} value={quantity}>{quantity}</option>
                                ))}
                            </select>
                        )}
                    </label>
                </div>
            ))}
            <h2>Your Fried Rice</h2>
            {Object.entries(ingredients).map(([ingredient, quantity], index) => (
                <p key={index}>{ingredient}: {quantity}</p>
            ))}
           <button onClick={handleFormSubmit}>Place Order</button>
        </div>
    );
};

export default FriedRice;
