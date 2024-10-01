import React, { useEffect, useState } from "react";
import axios from "axios";
import "daisyui";
import { HorizontalLine } from "../components/HorizontalLine"; // Assuming you have this component

export const Overview = () => {
  const [reports, setReports] = useState([]);
  const [selectedSalesShop, setSelectedSalesShop] = useState(
    localStorage.getItem("shopId") || ""
  );
  const [salesView, setSalesView] = useState("daily");
  const [salesData, setSalesData] = useState([]);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showSalesButton, setShowSalesButton] = useState(false);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleToggle = (view) => {
    setSalesView(view);
  };

  const handleCalculateSales = async (type) => {
    setError(null);
    setSuccessMessage(null);
    try {
      let response;
      const specificDate = `${year}-${month}-${day}`;

      if (type === "daily") {
        response = await axios.post(
          "http://localhost:3000/api/sellsReport/dailyIncomeByShop",
          {
            shopId: selectedSalesShop,
            specificDate,
          }
        );
      } else if (type === "monthly") {
        response = await axios.post(
          "http://localhost:3000/api/sellsReport/monthlyIncomeByShop",
          {
            shopId: selectedSalesShop,
            year,
            month,
          }
        );
      } else if (type === "yearly") {
        response = await axios.post(
          "http://localhost:3000/api/sellsReport/yearlyIncomeByShop",
          {
            shopId: selectedSalesShop,
            year,
          }
        );
      }

      console.log("Sales data calculated:", response.data);
      setSalesData(response.data);
      setShowSalesButton(true);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      console.error("Error calculating sales:", err);
    }
  };

  const handleShowSales = async (type) => {
    setError(null);
    setSuccessMessage(null);
    try {
      let response;
      const specificDate = `${year}-${month}-${day}`;
      const params = {
        shopId: selectedSalesShop,
      };

      if (type === "daily") {
        params.specificDate = specificDate;
        response = await axios.get(
          "http://localhost:3000/api/sellsReport/dailyIncomeByShop",
          { params }
        );
      } else if (type === "monthly") {
        params.year = year;
        params.month = month;
        response = await axios.get(
          "http://localhost:3000/api/sellsReport/monthlyIncomeByShop",
          { params }
        );
      } else if (type === "yearly") {
        params.year = year;
        response = await axios.get(
          "http://localhost:3000/api/sellsReport/yearlyIncomeByShop",
          { params }
        );
      }

      console.log("Sales data shown:", response.data);
      const incomeData = response.data.data;

      // Check if incomeData is an object and handle accordingly
      if (
        incomeData &&
        typeof incomeData === "object" &&
        !Array.isArray(incomeData)
      ) {
        // Set sales data with shop details
        setSalesData([
          {
            shopId: incomeData._id.shopId,
            year: incomeData._id.year,
            month: incomeData._id.month,
            day: incomeData._id.day || "N/A",
            totalIncome: incomeData.totalIncome,
            salesDetails: incomeData.salesDetails,
          },
        ]);
        setSuccessMessage(response.data.message);
      } else {
        setError("No sales data found.");
        console.warn(
          "Expected incomeData to be an object but got:",
          incomeData
        );
      }
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      console.error("Error showing sales:", err);
    }
  };

  return (
    <div className="flex-1 w-[83vw] bg-[#F4F4F4] p-8">
      <h1 className="font-russo text-[#212529] text-4xl">Sales Overview</h1>
      <HorizontalLine />

      {/* Sales Section */}
      <div className="grid grid-cols-1 gap-8 mt-8">
        <Card
          title={
            salesView === "daily"
              ? "Daily Sales"
              : salesView === "monthly"
              ? "Monthly Sales"
              : "Yearly Sales"
          }
        >
          {/* Mini Navbar for Sales View */}
          <div className="flex space-x-4 mb-4">
            {["daily", "monthly", "yearly"].map((view) => (
              <button
                key={view}
                onClick={() => handleToggle(view)}
                className={`p-2 rounded transition duration-200 ${
                  salesView === view
                    ? "bg-[#E76F51] text-white"
                    : "bg-white text-[#E76F51] hover:bg-[#E76F51] hover:text-white border border-[#E76F51]"
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)} Sales
              </button>
            ))}
          </div>

          {/* Dropdowns for Sales Data */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <select
              className="p-2 border border-[#E76F51] rounded"
              value={selectedSalesShop}
              onChange={(e) => setSelectedSalesShop(e.target.value)}
              disabled
            >
              <option value={selectedSalesShop}>
                Current Shop: {selectedSalesShop}
              </option>
            </select>

            {/* Year Dropdown for Yearly Sales */}
            <select
              className="p-2 border border-[#E76F51] rounded"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">Select Year</option>
              {[2021, 2022, 2023, 2024].map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>

            {/* Month Dropdown for Monthly Sales */}
            {salesView !== "yearly" && (
              <select
                className="p-2 border border-[#E76F51] rounded"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="">Select Month</option>
                {monthNames.map((m, index) => (
                  <option key={m} value={index + 1}>
                    {m}
                  </option>
                ))}
              </select>
            )}

            {/* Day Dropdown for Daily Sales */}
            {salesView === "daily" && (
              <select
                className="p-2 border border-[#E76F51] rounded"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                <option value="">Select Day</option>
                {Array.from({ length: 31 }, (_, index) => index + 1).map(
                  (d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  )
                )}
              </select>
            )}
          </div>

          {/* Calculate and Show Sales Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => handleCalculateSales(salesView)}
              className="p-2 bg-[#E76F51] text-white rounded"
            >
              Calculate Sales
            </button>
            <button
              onClick={() => handleShowSales(salesView)}
              className="p-2 bg-[#5C646C] text-white rounded"
              disabled={!showSalesButton}
            >
              Show Sales
            </button>
          </div>

          {/* Error/Success Message */}
          {error && <div className="text-red-600 mt-4">{error}</div>}
          {successMessage && (
            <div className="text-green-600 mt-4">{successMessage}</div>
          )}

          {/* Display Sales Data */}
          {salesData.length > 0 && (
            <div className="mt-8">
              {salesData.map((data, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-xl font-semibold">
                    Shop ID: {data.shopId}
                  </h3>
                  <p>
                    Total Income: <strong>${data.totalIncome}</strong>
                  </p>
                  <p>
                    Date: {data.day}/{data.month}/{data.year}
                  </p>

                  {/* Sales Details Table */}
                  <table className="table w-full border-collapse border border-gray-200 mt-4">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 p-2">Item ID</th>
                        <th className="border border-gray-300 p-2">Quantity</th>
                        <th className="border border-gray-300 p-2">
                          Total Sales
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.salesDetails.map((item, idx) => (
                        <tr key={idx}>
                          <td className="border border-gray-300 p-2">
                            {item.itemId}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {item.quantity}
                          </td>
                          <td className="border border-gray-300 p-2">
                            ${item.totalSales}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

// Card Component (example)
const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="font-bold text-xl">{title}</h2>
    {children}
  </div>
);
