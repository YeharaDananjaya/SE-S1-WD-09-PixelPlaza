import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import "../styles/PurchasingPage.css";
import CheckoutPopup from "../components/CheckoutPopup"; // Import the CheckoutPopup component

const PurchasingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [deliveryDates, setDeliveryDates] = useState({ start: "", end: "" });
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setMainImage(
          res.data.images && res.data.images.length > 0
            ? res.data.images[0]
            : "/default-image.png"
        );
      })
      .catch((err) => {
        console.log("Error fetching product:", err);
      });
  }, [id]);

  const handleThumbnailClick = (src) => {
    setMainImage(src);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const calculateDeliveryDates = () => {
      const today = new Date();
      const start = new Date();
      const end = new Date();

      start.setDate(today.getDate() + 5);
      end.setDate(today.getDate() + 7);

      const options = { day: "numeric", month: "short" };
      setDeliveryDates({
        start: start.toLocaleDateString("en-GB", options),
        end: end.toLocaleDateString("en-GB", options),
      });
    };

    calculateDeliveryDates();
  }, []);

  const handleAddToCart = () => {
    const isColorRequired = product.colors && product.colors.length > 0;
    const isSizeRequired = product.sizes && product.sizes.length > 0;

    if (isColorRequired && !selectedColor) {
      alert("Please select a color.");
      return;
    }

    if (isSizeRequired && !selectedSize) {
      alert("Please select a size.");
      return;
    }

    axios
      .post("http://localhost:3000/api/cartProduct", {
        name: product.name,
        price: product.price,
        count: quantity,
        color: selectedColor,
        sizes: selectedSize,
        description: product.description,
        images: product.images,
      })
      .then(() => {
        alert("Item added to cart successfully!");
        navigate("/cart");
      })
      .catch((err) => {
        console.log("Error adding item to cart:", err);
        alert("Failed to add item to cart.");
      });
  };

  const handleBuyNow = () => {
    const isColorRequired = product.colors && product.colors.length > 0;
    const isSizeRequired = product.sizes && product.sizes.length > 0;

    if (isColorRequired && !selectedColor) {
      alert("Please select a color.");
      return;
    }

    if (isSizeRequired && !selectedSize) {
      alert("Please select a size.");
      return;
    }

    setIsCheckoutOpen(true);
  };

  const handleAddToWishlist = () => {
    // Add to wishlist functionality
    axios
      .post("http://localhost:3000/api/wishlist", {
        name: product.name,
        price: product.price,

        description: product.description,
        images: product.images,
      })
      .then(() => {
        alert("Item added to wishlist!");
      })
      .catch((err) => {
        console.log("Error adding item to wishlist:", err);
        alert("Failed to add item to wishlist.");
      });
  };

  const handleCheckoutConfirm = ({ selectedPaymentMethod, deliveryOption }) => {
    const orderData = {
      userId: "exampleUserId",
      items: [
        {
          name: product.name,
          price: product.price,
          count: quantity,
          color: selectedColor,
          sizes: selectedSize,
          description: product.description,
          images: product.images,
        },
      ],
    };

    axios
      .post("http://localhost:3000/api/previousOrders", orderData)
      .then(() => {
        alert(
          "Purchase successful! Your order is now saved under Previous Orders."
        );
        navigate("/profile", { state: { activeCategory: "previousOrders" } });
      })
      .catch((error) => {
        console.error("Error during purchase process:", error);
        alert(
          `Error during purchase: ${
            error.response?.data?.message || error.message
          }`
        );
      })
      .finally(() => {
        setIsCheckoutOpen(false);
      });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <div className="container purchasing-page">
      <br />
      <br />
      <br />
      <div className="row">
        <div className="col-lg-6">
          <div className="product-images">
            <img src={mainImage} alt="Product" className="img-fluid main-img" />
            <div className="thumbnail-images">
              {product.images.map((image, index) => (
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
          <div className="seller-details">
            <h3>Seller Details</h3>
            <p>
              <strong>Seller Name:</strong>{" "}
              {product.sellerInfo?.name || "Unknown Seller"}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {product.sellerInfo?.address || "Unknown Address"}
            </p>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="product-details">
            <h2 className="product-title">{product.name}</h2>
            <p className="product-price">
              Rs. {product.price}
              {product.originalPrice && (
                <span className="discount"> Rs. {product.originalPrice}</span>
              )}
            </p>
            <p className="product-description">{product.description}</p>

            {product.colors && product.colors.length > 0 && (
              <div className="color-selection">
                <label>Select Color:</label>
                <div className="color-options">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className={`color-option ${
                        selectedColor === color ? "selected" : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="size-selection">
                <label>Select Size:</label>
                <div className="size-options">
                  {product.sizes.map((size, index) => (
                    <div
                      key={index}
                      className={`size-option ${
                        selectedSize === size ? "selected" : ""
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="quantity-selection">
              <button onClick={handleDecrement}>-</button>
              <input type="number" value={quantity} readOnly />
              <button onClick={handleIncrement}>+</button>
            </div>

            <div className="total-price">
              <p>
                <strong>Total Price:</strong> Rs. {totalPrice}
              </p>
            </div>

            <div className="purchase-buttons">
              <button className="btn-primary" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="btn-primary" onClick={handleBuyNow}>
                Buy Now
              </button>
              <button
                className="btn btn-wishlist"
                onClick={handleAddToWishlist}
              >
                <FaHeart />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Popup */}
      <CheckoutPopup
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onConfirm={handleCheckoutConfirm}
        totalAmount={parseFloat(totalPrice)}
      />
    </div>
  );
};

export default PurchasingPage;
