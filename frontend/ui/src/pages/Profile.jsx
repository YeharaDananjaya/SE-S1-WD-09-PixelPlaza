import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Profile.css";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Profile = () => {
  const [activeCategory, setActiveCategory] = useState("personalDetails");
  const [previousOrders, setPreviousOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterAmount, setFilterAmount] = useState("");
  const [maxFilterAmount, setMaxFilterAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
  });

  const [addresses, setAddresses] = useState([
    { id: 1, address: "123 Main St, City, Country" },
  ]);
  const [newAddress, setNewAddress] = useState("");

  const [loyaltyStatus, setLoyaltyStatus] = useState("Gold Member");
  const [cards, setCards] = useState([
    {
      id: 1,
      cardNumber: "**** **** **** 1234",
      cardHolder: "John Doe",
      expiryDate: "12/24",
    },
  ]);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
  });

  useEffect(() => {
    if (activeCategory === "previousOrders") {
      axios
        .get("http://localhost:3000/api/previousOrders")
        .then((res) => {
          setPreviousOrders(res.data);
          setFilteredOrders(res.data); // Initialize filteredOrders with all orders
        })
        .catch(() => console.log("Error fetching previous orders"));
    }
  }, [activeCategory]);

  useEffect(() => {
    let filtered = previousOrders;

    // Filter by minimum amount
    if (filterAmount) {
      filtered = filtered.filter(
        (order) =>
          order.items.reduce((acc, item) => acc + item.price * item.count, 0) >=
          filterAmount
      );
    }

    // Filter by maximum amount
    if (maxFilterAmount) {
      filtered = filtered.filter(
        (order) =>
          order.items.reduce((acc, item) => acc + item.price * item.count, 0) <=
          maxFilterAmount
      );
    }

    // Filter by date range
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.date);
        return orderDate >= start && orderDate <= end;
      });
    }

    setFilteredOrders(filtered);
  }, [filterAmount, maxFilterAmount, startDate, endDate, previousOrders]);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = () => {
    if (newAddress.trim()) {
      setAddresses((prev) => [
        ...prev,
        { id: prev.length + 1, address: newAddress },
      ]);
      setNewAddress("");
    }
  };

  const handleDeleteAddress = (id) => {
    setAddresses((prev) => prev.filter((address) => address.id !== id));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCard = () => {
    if (newCard.cardNumber && newCard.cardHolder && newCard.expiryDate) {
      setCards((prev) => [
        ...prev,
        {
          ...newCard,
          id: prev.length + 1,
          cardNumber: `**** **** **** ${newCard.cardNumber.slice(-4)}`,
        },
      ]);
      setNewCard({ cardNumber: "", cardHolder: "", expiryDate: "" });
    }
  };

  const handleDeleteCard = (id) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const handleDeletePreviousOrders = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all previous orders? This action cannot be undone."
    );

    if (confirmed) {
      axios
        .delete("http://localhost:3000/api/previousOrders")
        .then(() => {
          setPreviousOrders([]);
          alert("All previous orders have been deleted successfully!");
        })
        .catch((err) => {
          console.error("Error deleting previous orders", err);
          alert("Error deleting previous orders");
        });
    }
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text("Order Report", 20, 20);

    filteredOrders.forEach((order, index) => {
      try {
        const orderNumber = index + 1;
        const totalAmount = order.items
          .reduce((acc, item) => acc + item.price * item.count, 0)
          .toFixed(2);

        // Add order header
        const orderHeaderY = doc.autoTable.previous?.finalY || 30;
        doc.text(`Order No: ${orderNumber}`, 20, orderHeaderY + 10);
        doc.text(
          `Order Date: ${new Date(order.date).toLocaleDateString()}`,
          20,
          orderHeaderY + 20
        );
        doc.text(`Total Amount: Rs.${totalAmount}`, 20, orderHeaderY + 30);

        // Add items table for this order
        const itemsTable = order.items.map((item) => [
          item.name,
          item.count,
          `Rs.${item.price.toFixed(2)}`,
          `RS.${(item.price * item.count).toFixed(2)}`,
        ]);

        doc.autoTable({
          startY: orderHeaderY + 40,
          head: [["Item Name", "Quantity", "Unit Price", "Total Price"]],
          body: itemsTable,
        });
      } catch (error) {
        console.error("Error generating PDF for order", index + 1, error);
      }
    });

    doc.save("order_report.pdf");
  };

  const location = useLocation();
  useEffect(() => {
    if (location.state?.activeCategory) {
      setActiveCategory(location.state.activeCategory);
    }
  }, [location.state]);

  return (
    <div>
      <br />
      <br />
      <br />

      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-sidebar">
            <ul>
              <div className="profile-header">
                <h1>My Profile</h1>
                <p className="loyalty-status">{loyaltyStatus} 💎</p>
              </div>

              <li
                className={activeCategory === "personalDetails" ? "active" : ""}
                onClick={() => setActiveCategory("personalDetails")}
              >
                👤 Personal Details
              </li>
              <li
                className={activeCategory === "addressBook" ? "active" : ""}
                onClick={() => setActiveCategory("addressBook")}
              >
                📦 Address Book
              </li>
              <li
                className={activeCategory === "paymentDetails" ? "active" : ""}
                onClick={() => setActiveCategory("paymentDetails")}
              >
                💳 Payment Bank Details
              </li>
              <li
                className={activeCategory === "wishlist" ? "active" : ""}
                onClick={() => setActiveCategory("wishlist")}
              >
                ❤️ Wishlist
              </li>
              <li
                className={activeCategory === "previousOrders" ? "active" : ""}
                onClick={() => setActiveCategory("previousOrders")}
              >
                🛒 Previous Orders
              </li>
            </ul>
          </div>

          <div className="profile-main">
            {activeCategory === "personalDetails" && (
              <div className="category-section">
                <h2>👤 Personal Details</h2>
                <div className="input-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={personalInfo.name}
                    onChange={handleInfoChange}
                  />
                </div>
                <div className="input-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handleInfoChange}
                  />
                </div>
                <div className="input-group">
                  <label>Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handleInfoChange}
                  />
                </div>
              </div>
            )}

            {activeCategory === "addressBook" && (
              <div className="category-section">
                <h2>📦 Address Book</h2>
                {addresses.map((address) => (
                  <div key={address.id} className="address-item">
                    <p>{address.address}</p>
                    <button onClick={() => handleDeleteAddress(address.id)}>
                      Remove
                    </button>
                  </div>
                ))}
                <div className="add-address-group">
                  <input
                    type="text"
                    placeholder="Add new address"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                  />
                  <button onClick={handleAddAddress}>Add Address</button>
                </div>
              </div>
            )}

            {activeCategory === "paymentDetails" && (
              <div className="category-section">
                <h2>💳 Payment Bank Details</h2>
                {cards.map((card) => (
                  <div key={card.id} className="card-item">
                    <div className="card-details">
                      <p className="card-number">{card.cardNumber}</p>
                      <p className="card-holder">{card.cardHolder}</p>
                      <p className="expiry-date">{card.expiryDate}</p>
                    </div>
                    <button onClick={() => handleDeleteCard(card.id)}>
                      Remove
                    </button>
                  </div>
                ))}
                <div className="add-card-group">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={newCard.cardNumber}
                    onChange={handleCardChange}
                  />
                  <input
                    type="text"
                    name="cardHolder"
                    placeholder="Card Holder Name"
                    value={newCard.cardHolder}
                    onChange={handleCardChange}
                  />
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="Expiry Date (MM/YY)"
                    value={newCard.expiryDate}
                    onChange={handleCardChange}
                  />
                  <button onClick={handleAddCard}>Add Card</button>
                </div>
              </div>
            )}

            {activeCategory === "wishlist" && (
              <div className="category-section">
                <h2>❤️ Wishlist</h2>
                <p>Wishlist items go here...</p>
              </div>
            )}

            {activeCategory === "previousOrders" && (
              <div className="previous-orders-container">
                <h2>🛒 Previous Orders</h2>

                <div className="filter-section">
                  <div>
                    <label htmlFor="filterAmount">Minimum Amount:</label>
                    <input
                      type="number"
                      id="filterAmount"
                      value={filterAmount}
                      onChange={(e) => setFilterAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="maxFilterAmount">Maximum Amount:</label>
                    <input
                      type="number"
                      id="maxFilterAmount"
                      value={maxFilterAmount}
                      onChange={(e) => setMaxFilterAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                      type="date"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate">End Date:</label>
                    <input
                      type="date"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <button
                    className="generate-pdf-button"
                    onClick={handleGeneratePDF}
                  >
                    Generate PDF
                  </button>
                  <button
                    className="delete-orders-button"
                    onClick={handleDeletePreviousOrders}
                  >
                    Delete All Previous Orders
                  </button>
                </div>

                {filteredOrders.length === 0 ? (
                  <p>No previous orders found</p>
                ) : (
                  <div
                    className="orders-grid"
                    style={{
                      maxHeight: "500px",
                      overflowY: "scroll",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    {filteredOrders
                      .slice()
                      .reverse()
                      .map((order, index) => (
                        <div key={index} className="order-card">
                          <div className="order-header">
                            <h3>Order {filteredOrders.length - index}</h3>
                            <p className="order-date">
                              Order Date:{" "}
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="order-items">
                            {order.items.slice(0, 3).map((item, idx) => (
                              <div key={idx} className="order-item">
                                <img
                                  src={item.images[0] || "/default-image.png"}
                                  alt={item.name}
                                  className="item-image"
                                />
                                <div className="item-details">
                                  <h4 className="item-name">{item.name}</h4>
                                  <p className="item-price">
                                    Price: ${item.price.toFixed(2)}
                                  </p>
                                  <p className="item-quantity">
                                    Quantity: {item.count}
                                  </p>
                                </div>
                              </div>
                            ))}
                            {order.items.length > 3 && (
                              <p className="more-items">
                                +{order.items.length - 3} more items
                              </p>
                            )}
                          </div>
                          <div className="order-summary">
                            <p className="summary-label">Total Amount:</p>
                            <p className="summary-amount">
                              $
                              {order.items
                                .reduce(
                                  (acc, item) => acc + item.price * item.count,
                                  0
                                )
                                .toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
