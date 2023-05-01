import React from "react";
import ProductType from "./ProductType";
import ProductSubType from "./ProductSubType";
import CustomTab from "../CustomTab";
import Product from "./Product";
import { useSelector } from "react-redux";

const Inventory = () => {
  const user = useSelector((state) => state.user?.data);
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const tabs = isAdmin
    ? [
        {
          key: "addProductType",
          name: "tabs.addProductType",
          component: <ProductType />,
        },
        {
          key: "addProductSubType",
          name: "tabs.addProductSubType",
          component: <ProductSubType />,
        },
        {
          key: "addWorker",
          name: "tabs.addProduct",
          component: <Product />,
        },
      ]
    : [];

  return (
    <div>
      <CustomTab tabs={tabs} />
    </div>
  );
};

export default Inventory;
