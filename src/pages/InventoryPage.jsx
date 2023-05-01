import React from "react";
import Header from "../components/Header";
import Inventory from "../components/Inventory/Inventory";

const InventoryPage = () => {
  return (
    <div className="w-full h-screen">
      <Header />
      <Inventory />
    </div>
  );
};

export default InventoryPage;
