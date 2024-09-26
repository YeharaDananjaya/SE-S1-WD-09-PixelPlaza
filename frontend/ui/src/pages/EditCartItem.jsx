import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EditCartItem.css"; // Ensure this file has the necessary styles

const EditCartItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const fetchCartItem = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/cartProduct/${id}`
        );
        setCartItem(res.data);
        setMainImage(
          res.data.images && res.data.images.length > 0
            ? res.data.images[0]
            : "/default-image.png"
        );
        setQuantity(res.data.count || 1);
        setSelectedColor(res.data.color); // Set initial color
        setSelectedSize(res.data.sizes); // Set initial size
      } catch (err) {
        console.log("Error fetching cart item:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItem();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!cartItem) return <div className="error">No cart item found.</div>;

  const handleThumbnailClick = (src) => setMainImage(src);
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleUpdateCartItem = async () => {
    try {
      await axios.put(`http://localhost:3000/api/cartProduct/${id}`, {
        count: quantity,
        color: selectedColor,
        sizes: selectedSize,
      });
      alert("Cart item updated successfully!");
      navigate("/cart");
    } catch (err) {
      console.log("Error updating cart item:", err);
      alert("Failed to update cart item.");
    }
  };

  const totalPrice = (cartItem.price * quantity).toFixed(2);

  return (
    <div className="container edit-cart-item">
      <div className="row">
        <div className="col-lg-6">
          <div className="product-images">
            <img src={mainImage} alt="Product" className="img-fluid main-img" />
            <div className="thumbnail-images">
              {cartItem.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="img-thumbnail"
                  onClick={() => handleThumbnailClick(image)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="product-details">
            <h2 className="product-title">{cartItem.name}</h2>
            <p className="product-price">
              Rs. {cartItem.price}
              {cartItem.originalPrice && (
                <span className="discount"> Rs. {cartItem.originalPrice}</span>
              )}
            </p>
            <p className="product-description">{cartItem.description}</p>

            {/* Color Selection */}
            <div className="selected-color">
              <strong>Selected Color:</strong>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                {/* Add more color options as needed */}
              </select>
            </div>

            {/* Size Selection */}
            <div className="selected-size">
              <strong>Selected Size:</strong>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                {/* Add more size options as needed */}
              </select>
            </div>

            {/* Quantity Selection */}
            <div className="quantity-selection">
              <button className="quantity-btn" onClick={handleDecrement}>
                -
              </button>
              <input
                type="number"
                value={quantity}
                readOnly
                className="quantity-input"
              />
              <button className="quantity-btn" onClick={handleIncrement}>
                +
              </button>
            </div>

            {/* Total Price */}
            <div className="total-price">
              <p>
                <strong>Total Price:</strong> Rs. {totalPrice}
              </p>
            </div>

            {/* Update Button */}
            <div className="purchase-buttons">
              <button className="btn-primary" onClick={handleUpdateCartItem}>
                Update Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCartItem;
