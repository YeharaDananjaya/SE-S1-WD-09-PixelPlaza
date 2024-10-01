import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SellerLayout from "./layouts/SellerLayout"; // Import SellerLayout
import AdminLayout from "./layouts/AdminLayout"; // Import AdminLayout
import ClientLayout from "./layouts/ClientLayout";
import ClientLayoutMap from "./layouts/ClientLayoutMap";
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
import IndexPage from "./pages/IndesxPage";
import ItemList from "./pages/ItemList";
import CartPage from "./pages/CartPage";
import PurchasingPage from "./pages/PurchasingPage";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import ScrollToTop from "./pages/ScrollToTop";
import EditCartItem from "./pages/EditCartItem";
import InsertFeedback from "./pages/InsertFeedback";
import FeedbackList from "./pages/FeedbackList";

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
          path="/Shoppanel"
          element={
            <AdminLayout>
              <Shoppanel />
            </AdminLayout>
          }
        />

        {/* Client Routes */}
        <Route
          path="/home"
          element={
            <ClientLayout>
              <IndexPage />
            </ClientLayout>
          }
        />

        <Route
          path="/mapModel"
          element={
            <ClientLayoutMap>
              <Mapmodel />
            </ClientLayoutMap>
          }
        />

        <Route
          path="/cart"
          element={
            <ClientLayout>
              <CartPage />
            </ClientLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <ClientLayout>
              <Profile />
            </ClientLayout>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ClientLayout>
              <Wishlist />
            </ClientLayout>
          }
        />

        <Route
          path="/itemlist"
          element={
            <ClientLayout>
              <ItemList />
            </ClientLayout>
          }
        />

        <Route
          path="/purchase/:id"
          element={
            <ClientLayout>
              <PurchasingPage />
            </ClientLayout>
          }
        />

        <Route
          path="/editcartitem/:id"
          element={
            <ClientLayout>
              <EditCartItem />
            </ClientLayout>
          }
        />
        
        <Route
          path="/insertfeedback/:id"
          element={
            <ClientLayout>
              <InsertFeedback />
            </ClientLayout>
          }
        />

        <Route
          path="/feedbacklist"
          element={
            <ClientLayout>
              <FeedbackList />
            </ClientLayout>
          }
        />

        
      </Routes>
    </Router>
  );
}

export default App;
