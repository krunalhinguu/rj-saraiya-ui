import React, { useState } from "react";
import { Tab } from "@headlessui/react";

import ViewOrder from "./ViewOrder";
import OrderBook from "./OrderBook";
import Order from "./Order";
import CustomTab from "../CustomTab";
import { useSelector } from "react-redux";

const Customer = () => {
  const user = useSelector((state) => state.user?.data);
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const tabs = isAdmin
    ? [
        {
          key: "placeOrder",
          name: "tabs.createOrder",
          component: <Order />,
        },
        {
          key: "viewOrder",
          name: "tabs.viewOrder",
          component: <ViewOrder />,
        },
        {
          key: "orderBook",
          name: "tabs.orderBook",
          component: <OrderBook />,
        },
      ]
    : [
        {
          key: "placeOrder",
          name: "tabs.createOrder",
          component: <Order />,
        },
        {
          key: "viewOrder",
          name: "tabs.viewOrder",
          component: <ViewOrder />,
        },
      ];

  return (
    <div>
      <CustomTab tabs={tabs} />
    </div>
  );
};

export default Customer;
