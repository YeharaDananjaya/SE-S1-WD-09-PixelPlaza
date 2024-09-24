import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SellerLayout from "./layouts/SellerLayout"; // Import SellerLayout
import AdminLayout from "./layouts/AdminLayout"; // Import AdminLayout
import { Overview } from "./pages/Overview";
import { LoginRegister } from "./pages/LoginRegister";
import { AddProduct } from "./pages/AddProduct"; // Import the AddProduct component
import { AllProducts } from "./pages/AllProducts";
import { Promotions } from "./pages/Promotions";
import { Inventory } from "./pages/Inventory";
import { SellerProfile } from "./pages/SellerProfile";
import { CreateAdmin } from "./pages/CreateAdmin";
import { CreateSeller } from "./pages/CreateSeller";
import { AdminDashboard } from "./pages/AdminDashboard";
import Shoppanel from "./pages/Shoppanel";
import Mapmodel from "./pages/Mapmodel";

const toggleTheme = () => {
  document.documentElement.classList.toggle("friend-theme");
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginRegister />} />

        {/* Seller Routes */}
        <Route
          path="/overview"
          element={
            <SellerLayout>
              <Overview />
            </SellerLayout>
          }
        />
        <Route
          path="/addproduct"
          element={
            <SellerLayout>
              <AddProduct />
            </SellerLayout>
          }
        />
        <Route
          path="/allproducts"
          element={
            <SellerLayout>
              <AllProducts />
            </SellerLayout>
          }
        />
        <Route
          path="/promotions"
          element={
            <SellerLayout>
              <Promotions />
            </SellerLayout>
          }
        />
        <Route
          path="/inventory"
          element={
            <SellerLayout>
              <Inventory />
            </SellerLayout>
          }
        />
        <Route
          path="/sellerProfile"
          element={
            <SellerLayout>
              <SellerProfile />
            </SellerLayout>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/adminDashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/CreateAdmin"
          element={
            <AdminLayout>
              <CreateAdmin />
            </AdminLayout>
          }
        />
        <Route
          path="/CreateSeller"
          element={
            <AdminLayout>
              <CreateSeller />
            </AdminLayout>
          }
        />
        <Route
          path="/Mapmodel"
          element={
            <AdminLayout>
              <Mapmodel />
            </AdminLayout>
          }
        />
        <Route
          path="/Shoppanel"
          element={
            <AdminLayout>
              <Shoppanel />
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
