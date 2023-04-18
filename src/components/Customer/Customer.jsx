import React, { useState } from "react";
import { Tab } from "@headlessui/react";

import ViewOrder from "./ViewOrder";
import OrderBook from "./OrderBook";
import Order from "./Order";
import CustomTab from "../CustomTab";


const Customer = () => {
  const tabs = [
    {
      key: "placeOrder",
      name: "Create Order",
      component: <Order />,
    },
    {
      key: "viewOrder",
      name: "View Order",
      component: <ViewOrder />,
    },
    {
      key: "orderBook",
      name: "Order Report",
      component: <OrderBook />,
    },
  ];

  return (
    <div>
      <CustomTab tabs={tabs} />
    </div>
  );
};

export default Customer;
