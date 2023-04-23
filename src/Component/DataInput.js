import React, { useState } from "react";

const DataInput = ({ addOrder }) => {
  const [order, setOrder] = useState({
    id: "",
    price: "",
    dish: "",
    table: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrder(order.table, {
      id: order.id,
      price: order.price,
      dish: order.dish,
    });

    // Save the order to local storage
    const orders = JSON.parse(localStorage.getItem("orders")) || {};
    orders[order.table] = orders[order.table] || [];
    orders[order.table].push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    setOrder({
      id: "",
      price: "",
      dish: "",
      table: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Unique Order Id:
          <input
            type="text"
            name="id"
            value={order.id}
            onChange={handleChange}
          />
        </label>

        <label>
          Choose price:
          <input
            type="number"
            name="price"
            value={order.price}
            onChange={handleChange}
          />
        </label>

        <label>
          Choose Dish:
          <input
            type="text"
            name="dish"
            value={order.dish}
            onChange={handleChange}
          />
        </label>

        <label>
          Choose table:
          <select name="table" value={order.table} onChange={handleChange}>
            <option value="">Select Tables</option>
            <option value="Table 1">Table 1</option>
            <option value="Table 2">Table 2</option>
            <option value="Table 3">Table 3</option>
          </select>
        </label>

        <button type="submit">Add to Bill</button>
      </form>
    </div>
  );
};

export default DataInput;