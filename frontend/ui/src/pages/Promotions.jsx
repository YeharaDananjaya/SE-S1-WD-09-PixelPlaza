import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlinePlusCircle } from "react-icons/hi";

export const Promotions = () => {
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [promotions, setPromotions] = useState([]);
  const [error, setError] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [poster, setPoster] = useState(""); // Changed from posterURL to poster
  const [countdowns, setCountdowns] = useState({});

  // Handle form submission
  const handleAddPromotion = async () => {
    if (
      isNaN(discount) ||
      discount.trim() === "" ||
      discount < 0 ||
      discount > 100
    ) {
      setError("Please enter a valid percentage for the discount (0-100).");
      return;
    }

    try {
      const newPromotion = {
        description,
        discount: Number(discount),
        startDate,
        endDate,
        poster: imageURL, // Changed from posterURL to poster
      };
      await axios.post("http://localhost:3000/api/promotions", newPromotion);
      alert("Promotion added successfully!");
      setError("");
      fetchPromotions();
      setDescription("");
      setDiscount("");
      setStartDate("");
      setEndDate("");
      setPoster(""); // Reset poster after submission
      setImageURL(""); // Reset imageURL after submission
    } catch (error) {
      console.error("Failed to create promotion:", error);
      setError("Failed to create promotion. Please check your inputs.");
    }
  };

  // Fetch ongoing promotions
  const fetchPromotions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/promotions");
      const ongoingPromotions = response.data.filter((promo) => {
        const now = new Date();
        return (
          new Date(promo.startDate) <= now && new Date(promo.endDate) >= now
        );
      });
      setPromotions(ongoingPromotions);
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCountdowns = {};
      promotions.forEach((promo) => {
        updatedCountdowns[promo._id] = getCountdown(promo.endDate);
      });
      setCountdowns(updatedCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [promotions]);

  // Function to calculate time remaining
  const getCountdown = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const timeDiff = end - now;

    if (timeDiff <= 0) return "Expired";

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="flex-1 bg-[#F4F4F4] p-8">
      <h1 className="font-russo text-[#212529] text-4xl text-center">
        Promotions
      </h1>
      <div className="relative mt-8 p-8 bg-[#F4F4F4] border-[#E76F51] border-4 rounded-lg">
        <div
          className="absolute top-0 left-0 w-1/2 h-12 flex items-center justify-center bg-[#E76F51]"
          style={{ borderTopLeftRadius: "0.25rem" }}
        >
          <h2 className="font-russo text-white text-2xl">Add A Promotion</h2>
        </div>
        <div className="ml-1/2 mt-12 flex">
          <div className="w-1/3 p-4 bg-gray-300 rounded-lg">
            <div
              className="h-40 bg-gray-400 rounded-lg mb-4 flex items-center justify-center cursor-pointer"
              onClick={() => setPoster(imageURL)} // Changed from setPosterURL to setPoster
            >
              {poster ? (
                <img
                  src={poster}
                  alt="Poster"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "path/to/placeholder-image.jpg"; // Optional: Add a placeholder image
                  }}
                />
              ) : (
                <HiOutlinePlusCircle className="text-[#E76F51] text-4xl" />
              )}
            </div>
            <p className="text-center">Poster</p>
            <input
              type="text"
              className="input input-bordered w-full mt-4 rounded-lg"
              placeholder="Enter Image URL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </div>
          <div className="w-2/3 pl-8">
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Description:
              </label>
              <input
                type="text"
                className="input input-bordered w-full rounded-lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Discount (%):
              </label>
              <input
                type="text"
                className="input input-bordered w-full rounded-lg"
                value={discount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value) && value >= 0 && value <= 100) {
                    setDiscount(value);
                    setError("");
                  } else {
                    setError("Please enter a valid percentage (0-100).");
                  }
                }}
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4 flex">
              <div className="w-1/2 pr-4">
                <label className="block text-sm font-semibold mb-2">
                  Starting Date:
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full rounded-lg"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-semibold mb-2">
                  Ending Date:
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full rounded-lg"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-[#5C646C] text-[#F4F4F4] py-2 px-4 rounded-lg"
                onClick={() => {
                  setDescription("");
                  setDiscount("");
                  setStartDate("");
                  setEndDate("");
                  setError("");
                  setPoster("");
                  setImageURL("");
                }}
              >
                Reset
              </button>
              <button
                className="bg-[#E76F51] text-white py-2 px-4 rounded-lg"
                onClick={handleAddPromotion}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-8 p-8 bg-[#F4F4F4] border-[#E76F51] border-4 rounded-lg">
        <div
          className="absolute top-0 left-0 w-1/2 h-12 flex items-center justify-center bg-[#E76F51]"
          style={{ borderTopLeftRadius: "0.25rem" }}
        >
          <h2 className="font-russo text-white text-2xl">Ongoing Promotions</h2>
        </div>
        <div className="ml-1/2 mt-12 flex flex-wrap">
          {promotions.map((promo) => (
            <div
              key={promo._id}
              className="w-1/3 p-4 bg-white border border-gray-300 rounded-lg mb-4 flex flex-col"
            >
              <img
                src={promo.poster}
                alt="Promotion Poster"
                className="h-40 object-cover mb-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "path/to/placeholder-image.jpg"; // Optional: Add a placeholder image
                }}
              />
              <p className="text-xl font-semibold mb-2 text-[#E76F51]">
                {promo.discount}% OFF
              </p>
              <p className="text-sm mb-4">
                Ends in:{" "}
                <span className="font-semibold">
                  {countdowns[promo._id] || "Calculating..."}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Start Date: {new Date(promo.startDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                End Date: {new Date(promo.endDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
