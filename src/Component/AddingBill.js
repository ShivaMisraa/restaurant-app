import React, { useState } from "react";
import DataInput from "./DataInput";

function AddingBill() {
  const [orders, setOrders] = useState({
    "Table 1": [],
    "Table 2": [],
    "Table 3": [],
  });

  const addOrder = (table, order) => {
    setOrders((prevOrders) => {
      const updatedOrders = { ...prevOrders };
      updatedOrders[table].push(order);
      return updatedOrders;
    });

    // Save the order to local storage
    const orders = JSON.parse(localStorage.getItem("orders")) || {};
    orders[table] = orders[table] || [];
    orders[table].push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
  };

  const deleteOrder = (table, index) => {
    setOrders((prevOrders) => {
      const updatedOrders = { ...prevOrders };
      updatedOrders[table].splice(index, 1);
      return updatedOrders;
    });

    // Remove the order from local storage
    const orders = JSON.parse(localStorage.getItem("orders")) || {};
    orders[table].splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
  };

  return (
    <div>
      <h1>My Restaurant App</h1>
      <DataInput addOrder={addOrder} />
      <div>
        {Object.keys(orders).map((table) => (
          <div key={table}>
            <h3>{table}</h3>
            <ul>
              {orders[table].map((order, index) => (
                <li key={index}>
                  Order #{index + 1}: {order.dish} (${order.price})
                  <button onClick={() => deleteOrder(table, index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddingBill;
