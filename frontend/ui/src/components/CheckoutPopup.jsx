// CheckoutPopup.js
import React, { useState } from "react";
import "../styles/CheckoutPopup.css"; // Create appropriate styles

const CheckoutPopup = ({ isOpen, onClose, onConfirm, totalAmount }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("");

  const handleConfirm = () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    if (!deliveryOption) {
      alert("Please select a delivery or pickup option.");
      return;
    }
    onConfirm({ selectedPaymentMethod, deliveryOption });
  };

  if (!isOpen) return null;

  return (
    <div className="checkout-popup-overlay">
      <div className="checkout-popup">
        <h2>Checkout</h2>
        <div className="payment-options">
          <h3>Select Payment Method:</h3>
          <div>
            <input
              type="radio"
              id="credit-card"
              name="payment"
              value="credit-card"
              onChange={() => setSelectedPaymentMethod("credit-card")}
            />
            <label htmlFor="credit-card">Credit Card</label>
          </div>
          <div>
            <input
              type="radio"
              id="paypal"
              name="payment"
              value="paypal"
              onChange={() => setSelectedPaymentMethod("paypal")}
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
          <div>
            <input
              type="radio"
              id="koko"
              name="payment"
              value="koko"
              onChange={() => setSelectedPaymentMethod("koko")}
            />
            <label htmlFor="koko">Koko</label>
          </div>
        </div>

        <div className="delivery-options">
          <h3>Select Delivery or Pickup:</h3>
          <div>
            <input
              type="radio"
              id="delivery"
              name="delivery"
              value="delivery"
              onChange={() => setDeliveryOption("delivery")}
            />
            <label htmlFor="delivery">Delivery</label>
          </div>
          <div>
            <input
              type="radio"
              id="pickup"
              name="delivery"
              value="pickup"
              onChange={() => setDeliveryOption("pickup")}
            />
            <label htmlFor="pickup">Pickup</label>
          </div>
        </div>

        <div className="total-amount">
          <p>
            <strong>Total Amount:</strong> Rs. {totalAmount.toFixed(2)}
          </p>
        </div>

        <div className="popup-buttons">
          <button onClick={handleConfirm} className="confirm-button">
            Confirm
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPopup;
