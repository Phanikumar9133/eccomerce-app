import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [userCarts, setUserCarts] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch('http://localhost:5000/api/users');
        const users = await usersResponse.json();
        setUserList(users);

        const cartsResponse = await fetch('http://localhost:5000/api/carts');
        const carts = await cartsResponse.json();
        setUserCarts(carts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getTotalItems = () => {
    return userCarts.reduce((total, userCart) => total + userCart.items.length, 0);
  };

  return (
    <div className="admin-dashboard">
      <h1>🛒 Admin Dashboard</h1>
      <div className="admin-summary">
        <p><strong>Total Users:</strong> {userList.length}</p>
        <p><strong>Total Cart Items Across All Users:</strong> {getTotalItems()}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>User Email</th>
            <th>Product Name</th>
            <th>Price (₹)</th>
            <th>Quantity</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) =>
            userCarts.map((cart) =>
              cart.userEmail === user.email &&
              cart.items.map((item, index) => (
                <tr key={`${user.email}-${index}`}>
                  <td>{user.email}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td><img src={item.image} alt={item.name} width="50" /></td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
