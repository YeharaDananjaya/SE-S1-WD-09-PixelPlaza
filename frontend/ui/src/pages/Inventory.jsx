import React, { useState, useEffect } from "react";
import axios from "axios";
import { HorizontalLine } from "../components/HorizontalLine";
import { motion } from "framer-motion";
import { AiOutlineSearch, AiOutlinePlusCircle } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { HiOutlineTag } from "react-icons/hi";

export const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [restockQuantity, setRestockQuantity] = useState(0);
  const [selectedPromotion, setSelectedPromotion] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    const fetchPromotions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/promotions"
        );
        setPromotions(response.data);
      } catch (error) {
        console.error("Failed to fetch promotions:", error);
      }
    };

    fetchProducts();
    fetchPromotions();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRestock = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/products/${selectedProduct._id}`,
        { stock: selectedProduct.stock + restockQuantity }
      );
      setProducts(
        products.map((product) =>
          product._id === selectedProduct._id
            ? { ...product, stock: product.stock + restockQuantity }
            : product
        )
      );
      setRestockQuantity(0);
      setShowRestockModal(false);
    } catch (error) {
      console.error("Failed to restock product:", error);
    }
  };

  const handleApplyPromotion = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/products/applyPromotion/${selectedProduct._id}`,
        { promotionId: selectedPromotion }
      );
      setProducts(
        products.map((product) =>
          product._id === selectedProduct._id
            ? {
                ...product,
                promotionApplied: true,
                promotionId: selectedPromotion,
              }
            : product
        )
      );
      setSelectedPromotion("");
      setShowPromotionModal(false);
    } catch (error) {
      console.error("Failed to apply promotion:", error);
    }
  };

  const handleRemovePromotion = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/products/removePromotion/${selectedProduct._id}`
      );
      setProducts(
        products.map((product) =>
          product._id === selectedProduct._id
            ? { ...product, promotionApplied: false, promotionId: null }
            : product
        )
      );
      setShowPromotionModal(false);
    } catch (error) {
      console.error("Failed to remove promotion:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPromotionDetails = (promotionId) => {
    const promotion = promotions.find((promo) => promo._id === promotionId);
    return promotion
      ? `${promotion.name} - ${promotion.discount}%`
      : "No Promotion";
  };

  return (
    <div className="flex-1 bg-[#F4F4F4] p-8">
      <h1 className="font-russo text-[#212529] text-4xl text-center mb-4">
        Inventory
      </h1>
      <HorizontalLine />
      <div className="relative mt-8 p-6 bg-white border-[#E76F51] border-4 rounded-lg shadow-lg">
        <div className="absolute top-0 left-0 bg-[#E76F51] w-full h-12 flex items-center justify-center rounded-t-lg">
          <h2 className="font-russo text-white text-2xl">Product Inventory</h2>
        </div>
        <div className="flex justify-between items-center mt-12 mb-4">
          <button className="btn bg-[#E76F51] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#D64F3D] transition-colors">
            <AiOutlinePlusCircle className="mr-2" /> Add Product
          </button>
          <div className="relative w-1/3">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for products..."
              className="input input-bordered rounded-md w-full shadow-md"
            />
            <AiOutlineSearch className="absolute top-3 right-3 text-gray-400" />
          </div>
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="p-4 bg-white rounded-lg shadow-lg border border-[#E76F51]"
            >
              <div className="relative h-40 bg-gray-300 rounded-lg overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="h-full bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
                    No Images Available
                  </div>
                )}
              </div>
              <h3 className="text-center mb-4 text-xl font-semibold">
                {product.name}
              </h3>
              <div className="text-center mb-4">
                <p className="text-lg font-medium text-gray-700">
                  ${product.price.toFixed(2)}
                </p>
                <p
                  className={`text-sm ${
                    product.stock > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {product.promotionApplied ? (
                    <span>
                      Promotion: {getPromotionDetails(product.promotionId)}
                    </span>
                  ) : (
                    <span>No Promotion Applied</span>
                  )}
                </p>
              </div>
              <div className="flex justify-between mt-4">
                {product.promotionApplied ? (
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowPromotionModal(true);
                    }}
                    className="btn bg-red-500 text-white flex items-center space-x-2 px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-colors"
                  >
                    <HiOutlineTag /> <span>Remove Promotion</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowPromotionModal(true);
                    }}
                    className="btn bg-green-500 text-white flex items-center space-x-2 px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition-colors"
                  >
                    <HiOutlineTag /> <span>Apply Promotion</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowRestockModal(true);
                  }}
                  className="btn bg-[#E76F51] text-white flex items-center space-x-2 px-4 py-2 rounded-md shadow-md hover:bg-[#D64F3D] transition-colors"
                >
                  <BiRefresh /> <span>Restock</span>
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Restock Modal */}
      {showRestockModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white border-4 border-[#E76F51] p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Restock Product
            </h2>
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700">Quantity to Restock</span>
                <input
                  type="number"
                  value={restockQuantity}
                  onChange={(e) => setRestockQuantity(Number(e.target.value))}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                />
              </label>
              <div className="flex justify-between">
                <button
                  onClick={handleRestock}
                  className="btn bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition-colors"
                >
                  Restock
                </button>
                <button
                  onClick={() => setShowRestockModal(false)}
                  className="btn bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Promotion Modal */}
      {showPromotionModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white border-4 border-[#E76F51] p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {selectedProduct.promotionApplied
                ? "Remove Promotion"
                : "Apply Promotion"}
            </h2>
            <div className="space-y-4">
              {!selectedProduct.promotionApplied && (
                <label className="block">
                  <span className="text-gray-700">Select Promotion</span>
                  <select
                    value={selectedPromotion}
                    onChange={(e) => setSelectedPromotion(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                  >
                    <option value="">Select a promotion</option>
                    {promotions.map((promo) => (
                      <option key={promo._id} value={promo._id}>
                        {promo.name} - {promo.discount}%
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <div className="flex justify-between">
                {selectedProduct.promotionApplied ? (
                  <button
                    onClick={handleRemovePromotion}
                    className="btn bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-colors"
                  >
                    Remove Promotion
                  </button>
                ) : (
                  <button
                    onClick={handleApplyPromotion}
                    className="btn bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition-colors"
                  >
                    Apply Promotion
                  </button>
                )}
                <button
                  onClick={() => setShowPromotionModal(false)}
                  className="btn bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
