import React from "react";
import ProductType from "./ProductType";
import ProductSubType from "./ProductSubType";
import CustomTab from "../CustomTab";
import Product from "./Product";

const tabs = [
  {
    key: "addProductType",
    name: "Product Type",
    component: <ProductType />,
  },
  {
    key: "addProductSubType",
    name: "Product Sub Type",
    component: <ProductSubType />,
  },
  {
    key: "addWorker",
    name: "Product",
    component: <Product />,
  },
];

const Admin = () => {
  return (
    <div>
      <CustomTab tabs={tabs} />
    </div>
  );
};

export default Admin;
