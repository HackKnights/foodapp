import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const Wonton = () => {
    const [ingredients, setIngredients] = useState({});
    const availableIngredients = [
        { name: 'Yellow chives', type: 'checkbox' },
        { name: 'Shrimp', type: 'checkbox' },
        { name: 'Pork', type: 'checkbox' },
        { name: 'Fish', type: 'checkbox' },
        
    ];
    

    const handleIngredientChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === 'checkbox') {
            setIngredients({
                ...ingredients,
                [name]: checked ? 'Yes' : 'No'
            });
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const docRef = await db.collection('orders').add({
                WontonIngredients: ingredients,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            alert(`Your order has been placed! Order ID: ${docRef.id}`);
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('An error occurred while placing your order. Please try again later.');
        }
    };

    return (
        <div>
            <h1>Customize Your Wonton</h1>
            <h2>Ingredients</h2>
            {availableIngredients.map((ingredient, index) => (
                <div key={index}>
                    <label>
                        {ingredient.name}
                        
                            <input
                                type="checkbox"
                                name={ingredient.name}
                                onChange={handleIngredientChange}
                            />
                       
                        
                    </label>
                </div>
            ))}
            <h2>Your Wonton</h2>
            {Object.entries(ingredients).map(([ingredient, quantity], index) => (
                <p key={index}>{ingredient}: {quantity}</p>
            ))}
            <button onClick={handleFormSubmit}>Place Order</button>
        </div>
    );
};

export default Wonton;
