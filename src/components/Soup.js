import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';




firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const Soup = () => {
    const [ingredients, setIngredients] = useState({});
    const availableIngredients = [
        { name: 'Egg', type: 'checkbox' },
        { name: 'Beef Broth', type: 'checkbox' },
        { name: 'Chicken Broth', type: 'checkbox' },
        { name: 'Vegetables', type: 'checkbox' },
        { name: 'Sriracha', type: 'checkbox' },
        { name: 'Mushrooms', type: 'select' }, // Change type to 'select'
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

   const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const docRef = await db.collection('orders').add({
                SoupIngredients: ingredients,
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
            <h1>Customize Your Soup</h1>
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
            <h2>Your Soup</h2>
            {Object.entries(ingredients).map(([ingredient, quantity], index) => (
                <p key={index}>{ingredient}: {quantity}</p>
            ))}
            <button onClick={handleFormSubmit}>Place Order</button>
        </div>
    );
};

export default Soup;
