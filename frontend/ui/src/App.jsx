import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/SideBar";
import { AdminSidebar } from "./components/AdminSidebar .jsx";
import { Overview } from "./pages/Overview";
import { LoginRegister } from "./pages/LoginRegister";
import { AddProduct } from "./pages/AddProduct.jsx"; // Import the AddProduct component
import { AllProducts } from "./pages/AllProducts";
import { Promotions } from "./pages/Promotions";
import { Inventory } from "./pages/Inventory";
import { SellerProfile } from "./pages/SellerProfile";
import { CreateAdmin } from "./pages/CreateAdmin.jsx";
import { CreateSeller } from "./pages/CreateSeller.jsx";
import { AdminDashboard } from "./pages/AdminDashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route
          path="/overview"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 ml-64">
                {" "}
                {/* Adjust margin-left */}
                <Overview />
              </div>
            </div>
          }
        />
        <Route
          path="/addproduct"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 ml-64">
                {" "}
                {/* Adjust margin-left */}
                <AddProduct />
              </div>
            </div>
          }
        />
        <Route
          path="/allproducts"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 ml-64">
                {" "}
                {/* Adjust margin-left */}
                <AllProducts />
              </div>
            </div>
          }
        />
        <Route
          path="/promotions"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 ml-64">
                {" "}
                {/* Adjust margin-left */}
                <Promotions />
              </div>
            </div>
          }
        />
        <Route
          path="/inventory"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 ml-64">
                {" "}
                {/* Adjust margin-left */}
                <Inventory />
              </div>
            </div>
          }
        />
        <Route
          path="/sellerprofile"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 ml-64">
                {" "}
                {/* Adjust margin-left */}
                <SellerProfile />
              </div>
            </div>
          }
        />
        <Route
          path="/adminDashboard"
          element={
            <div className="flex">
              <AdminSidebar />
              <div className="flex-1 ml-64">
                {" "}
                {/* Adjust margin-left */}
                <AdminDashboard />
              </div>
            </div>
          }
        />
        <Route
          path="/CreateAdmin"
          element={
            <div className="flex">
              <AdminSidebar />
              <div className="flex-1 ml-64">
                {" "}
                {/* Adjust margin-left */}
                <CreateAdmin />
              </div>
            </div>
          }
        />
        <Route
          path="/CreateSeller"
          element={
            <div className="flex">
              <AdminSidebar />
              <div className="flex-1 ml-64">
                {" "}
                {/* Adjust margin-left */}
                <CreateSeller />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
