import React, { useEffect, useState } from "react";
import axios from "axios";
import WishlistCard from "../components/WishlistCard";
import "../styles/Wishlist.css";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/wishlist")
      .then((res) => {
        setWishlistItems(res.data);
      })
      .catch((err) => {
        console.log("Error fetching wishlist items:", err);
      });
  }, []);

  return (
    <div>
      <h2>Your Wishlist</h2>
      <div className="wishlist-items">
        {wishlistItems.map((item) => (
          <WishlistCard key={item.id} productId={item.productId} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
