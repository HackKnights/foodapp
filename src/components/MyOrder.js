import React from 'react';

const MyOrder = ({ order }) => {
  const { orderId, items, total } = order;

  return (
    <div>
      <h2>Order ID: {orderId}</h2>
      <h3>Items:</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <h3>Total: ${total}</h3>
    </div>
  );
};

export default MyOrder;
