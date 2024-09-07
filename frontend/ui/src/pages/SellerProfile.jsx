import React, { useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { HorizontalLine } from "../components/HorizontalLine";
import { motion } from "framer-motion";

export const SellerProfile = () => {
  const [salesPerformance, setSalesPerformance] = useState({
    totalSales: 0,
    averageOrderValue: 0,
    orders: 0,
  });
  const [notifications, setNotifications] = useState([]);

  const handleSalesPerformanceChange = (key, value) => {
    setSalesPerformance((prev) => ({ ...prev, [key]: value }));
  };

  const handleNotificationsChange = (key, value) => {
    setNotifications((prev) => [...prev, { [key]: value }]);
  };

  return (
    <div className="flex-1 bg-[#F4F4F4] p-8">
      <h1 className="font-russo text-[#212529] text-4xl text-center">
        Profile
      </h1>
      <div className="relative mt-8 p-8 bg-[#F4F4F4] border-[#E76F51] border-4 rounded-lg">
        <div
          className="absolute top-0 left-0 w-1/2 h-12 flex items-center justify-center bg-[#E76F51]"
          style={{ borderTopLeftRadius: "0.25rem" }}
        >
          <h2 className="font-russo text-white text-2xl">Store Information</h2>
        </div>
        <div className="ml-1/2 mt-12 flex gap-8">
          <div className="w-1/3 p-4 bg-gray-300 rounded-lg">
            <div className="h-40 bg-gray-400 rounded-lg mb-4 flex items-center justify-center">
              <div className="w-24 h-24 bg-gray-500 rounded-full"></div>
            </div>
            <p className="text-center">Store Logo</p>
          </div>
          <div className="w-2/3 pl-8">
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Store Name:
              </label>
              <h2 className="font-russo text-[#212529] text-2xl">Store Name</h2>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Address:
              </label>
              <p className="text-gray-500">123 Main Street, Anytown, USA</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Description:
              </label>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Contact Information:
              </label>
              <p className="text-gray-500">
                <span className="font-bold">Email:</span> store@example.com
              </p>
              <p className="text-gray-500">
                <span className="font-bold">Phone:</span> +1 (555) 555-5555
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mt-8 p-8 bg-[#F4F4F4] border-[#E76F51] border-4 rounded-lg">
        <div
          className="absolute top-0 left-0 w-1/2 h-12 flex items-center justify-center bg-[#E76F51]"
          style={{ borderTopLeftRadius: "0.25rem" }}
        >
          <h2 className="font-russo text-white text-2xl">Sales Performance</h2>
        </div>
        <div className="ml-1/2 mt-12 flex flex-col gap-4">
          {["Total Sales", "Average Order Value", "Orders"].map(
            (metric, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-gray-600">{metric}</h3>
                  <span className="font-bold text-gray-900">
                    ${salesPerformance[metric.toLowerCase().replace(/ /g, "")]}
                  </span>
                </div>
                <input
                  type="number"
                  value={
                    salesPerformance[metric.toLowerCase().replace(/ /g, "")]
                  }
                  onChange={(e) =>
                    handleSalesPerformanceChange(
                      metric.toLowerCase().replace(/ /g, ""),
                      e.target.value
                    )
                  }
                  className="input input-bordered rounded-md w-full"
                />
              </div>
            )
          )}
          <button className="bg-[#E76F51] text-white py-2 px-4 rounded-lg">
            View Graphical Representation
          </button>
        </div>
      </div>
      <div className="relative mt-8 p-8 bg-[#F4F4F4] border-[#E76F51] border-4 rounded-lg">
        <div
          className="absolute top-0 left-0 w-1/2 h-12 flex items-center justify-center bg-[#E76F51]"
          style={{ borderTopLeftRadius: "0.25rem" }}
        >
          <h2 className="font-russo text-white text-2xl">Notifications</h2>
        </div>
        <div className="ml-1/2 mt-12 flex flex-col gap-4">
          {notifications.length === 0 ? (
            <p className="text-gray-500">No notifications available.</p>
          ) : (
            notifications.map((notification, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg flex items-center"
              >
                <p className="text-gray-500 flex-1">
                  {Object.values(notification)[0]}
                </p>
                <div className="ml-auto flex gap-2">
                  <button className="btn btn-ghost btn-xs">
                    <AiOutlineEdit />
                  </button>
                  <button className="btn btn-ghost btn-xs">
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))
          )}
          <div className="flex items-center mt-4">
            <input
              type="text"
              placeholder="Add new notification"
              className="input input-bordered rounded-md flex-1 mr-2"
              onChange={(e) =>
                handleNotificationsChange("notification", e.target.value)
              }
            />
            <button className="btn btn-primary btn-xs">
              <HiOutlinePlusCircle />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
