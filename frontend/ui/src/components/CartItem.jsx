import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import "../styles/CartItem.css";
import { Link } from "react-router-dom";

const CartItem = ({ item, onUpdate, onDelete, onSelect, isSelected }) => {
  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate(item);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(item._id);
    }
  };

  const handleSelect = (e) => {
    if (onSelect) {
      onSelect(item._id, e.target.checked);
    }
  };

  const firstImage = item.images.length > 0 ? item.images[0] : "";

  return (
    <div className="cart-item">
      <div
        className="cart-item-selection"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          borderRadius: "8px",
          backgroundColor: isSelected ? "#dd7703" : "#ffffff",
          border: isSelected ? "2px solid #dd7703" : "2px solid #ccc",
          transition:
            "background-color 0.3s ease, border-color 0.3s ease, transform 0.2s ease", // Smooth transitions
          cursor: "pointer",
          boxShadow: isSelected
            ? "0px 4px 10px rgba(40, 167, 69, 0.3)"
            : "0px 2px 5px rgba(0, 0, 0, 0.1)", // Subtle shadow
          margin: "10px",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")} // Slight hover enlargement
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleSelect}
          style={{
            width: "24px",
            height: "24px",
            accentColor: "#ffffff", // White checkmark
            cursor: "pointer",
          }}
        />
      </div>

      {firstImage ? (
        <img src={firstImage} alt={item.name} className="cart-item-image" />
      ) : (
        <p>No image available</p>
      )}
      <div className="cart-item-details">
        <div className="cart-item-header">
          <h3>{item.name}</h3>
          <div className="cart-item-actions">
            <button className="edit-button">
              <Link to={`/editcartitem/${item._id}`}>
                <FaEdit />
              </Link>
            </button>
            <button className="delete-button" onClick={handleDelete}>
              <FaTrash />
            </button>
          </div>
        </div>
        <p>Price: Rs.{item.price}</p>
        <p>{item.description}</p>
        <div className="cart-item-options">
          <div className="color-selection">
            <label>Color:</label>
            <div
              className="color-display"
              style={{ backgroundColor: item.color || "#ccc" }}
            />
          </div>
          <div className="quantity-selection">
            <label>Quantity:</label>
            <input type="number" min="1" value={item.count} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
