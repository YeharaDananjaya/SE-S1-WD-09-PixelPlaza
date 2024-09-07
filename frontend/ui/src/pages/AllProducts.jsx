import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { HorizontalLine } from "../components/HorizontalLine";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import ImageCarousel from "../components/ImageCarousel"; // Adjust import path as needed

export const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false); // Added state for detail modal

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/products/${productToDelete}`
      );
      setProducts(
        products.filter((product) => product._id !== productToDelete)
      );
      setShowConfirmModal(false);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleUpdateProduct = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/products/${selectedProduct._id}`,
        selectedProduct
      );
      setProducts(
        products.map((product) =>
          product._id === selectedProduct._id ? selectedProduct : product
        )
      );
      setShowEditModal(false);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleShowDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-[#F4F4F4] p-8">
      <h1 className="font-russo text-[#212529] text-4xl text-center mb-4">
        Products
      </h1>
      <HorizontalLine />
      <div className="relative mt-8 p-6 bg-white border-[#E76F51] border-4 rounded-lg shadow-lg">
        <div className="absolute top-0 left-0 bg-[#E76F51] w-full h-12 flex items-center justify-center rounded-t-lg">
          <h2 className="font-russo text-white text-2xl">All Products</h2>
        </div>
        <div className="flex justify-between items-center mt-12 mb-4">
          <div className="flex space-x-4">
            <button className="btn bg-[#E76F51] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#D64F3D] transition-colors">
              <HiOutlinePlusCircle className="mr-2" /> Add Product
            </button>
            <button className="btn bg-gray-200 text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-300 transition-colors">
              Filter
            </button>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for products..."
            className="input input-bordered rounded-md w-1/3 shadow-md"
          />
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
                    className="object-cover w-full h-full cursor-pointer"
                    onClick={() => handleShowDetails(product)}
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
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="btn bg-[#E76F51] text-white flex items-center space-x-2 px-4 py-2 rounded-md shadow-md hover:bg-[#D64F3D] transition-colors"
                >
                  <AiOutlineEdit /> <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    setProductToDelete(product._id);
                    setShowConfirmModal(true);
                  }}
                  className="btn bg-red-500 text-white flex items-center space-x-2 px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-colors"
                >
                  <AiOutlineDelete /> <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Product Details Modal */}
      <Dialog
        open={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        className="fixed inset-0 flex items-center justify-center p-4"
      >
        <div className="bg-white border-4 border-[#E76F51] p-4 rounded-lg shadow-lg w-full max-w-2xl font-sans">
          <div className="flex flex-col sm:flex-row">
            {/* Image Section */}
            <div className="flex-shrink-0 w-full sm:w-1/2 mb-4 sm:mb-0">
              {selectedProduct?.images && selectedProduct.images.length > 0 ? (
                <ImageCarousel images={selectedProduct.images} />
              ) : (
                <div className="h-48 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-lg">
                  No Images Available
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="flex-1 pl-4">
              <Dialog.Title className="text-2xl font-bold text-primary mb-4">
                {selectedProduct?.name}
              </Dialog.Title>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="badge badge-outline badge-primary mr-2">
                    Price:
                  </span>
                  <span className="text-lg text-secondary">
                    ${selectedProduct?.price}
                  </span>
                </div>
                <div>
                  <span className="badge badge-outline badge-primary mr-2">
                    Description:
                  </span>
                  <p className="text-lg text-gray-700">
                    {selectedProduct?.description}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="badge badge-outline badge-primary mr-2">
                    Category:
                  </span>
                  <span className="text-lg text-gray-700">
                    {selectedProduct?.category}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="badge badge-outline badge-primary mr-2">
                    Colors:
                  </span>
                  <div className="flex space-x-2">
                    {selectedProduct?.colors.map((color, index) => (
                      <span
                        key={index}
                        className="badge badge-sm"
                        style={{ backgroundColor: color }}
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="badge badge-outline badge-primary mr-2">
                    Sizes:
                  </span>
                  <span className="text-lg text-gray-700">
                    {selectedProduct?.sizes.join(", ")}
                  </span>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="btn btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Edit Product Modal */}
      <Dialog
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        className="fixed inset-0 flex items-center justify-center p-4"
      >
        <div className="bg-white border-4 border-[#E76F51] p-6 rounded-lg shadow-lg w-full max-w-md">
          <Dialog.Title className="text-2xl font-bold text-primary mb-4">
            Edit Product
          </Dialog.Title>
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Product Name</span>
              <input
                type="text"
                value={selectedProduct?.name || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value,
                  })
                }
                className="input input-bordered mt-1 w-full"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Price</span>
              <input
                type="number"
                value={selectedProduct?.price || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: e.target.value,
                  })
                }
                className="input input-bordered mt-1 w-full"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Description</span>
              <textarea
                value={selectedProduct?.description || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    description: e.target.value,
                  })
                }
                className="textarea textarea-bordered mt-1 w-full"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Category</span>
              <input
                type="text"
                value={selectedProduct?.category || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    category: e.target.value,
                  })
                }
                className="input input-bordered mt-1 w-full"
              />
            </label>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button onClick={handleUpdateProduct} className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Confirm Delete Modal */}
      <Dialog
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        className="fixed inset-0 flex items-center justify-center p-4"
      >
        <div className="bg-white border-4 border-red-500 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
          <Dialog.Title className="text-2xl font-bold text-red-500 mb-4">
            Confirm Delete
          </Dialog.Title>
          <p className="mb-6">
            Are you sure you want to delete this product? This action cannot be
            undone.
          </p>
          <div className="flex justify-center space-x-4">
            <button onClick={handleDelete} className="btn btn-error text-white">
              Delete
            </button>
            <button
              onClick={() => setShowConfirmModal(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
