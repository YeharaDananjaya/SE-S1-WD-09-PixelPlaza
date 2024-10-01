import React from "react";
import Navbar from "../components/NavBar";

const ClientLayoutMap = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex ">{children}</div>
      
    </div>
  );
};

export default ClientLayoutMap;
