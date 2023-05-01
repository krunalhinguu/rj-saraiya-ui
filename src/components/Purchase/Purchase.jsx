import React from "react";
import CustomTab from "../CustomTab";
import Dealer from "./Dealer";
import GoodsPurchase from "./GoodsPurchase";
import PurchaseReport from "./PurchaseReport.jsx";
import { useSelector } from "react-redux";

const Purchase = () => {
  const user = useSelector((state) => state.user?.data);
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const tabs = isAdmin
    ? [
        {
          key: "addDealer",
          name: "tabs.addDealerInfo",
          component: <Dealer />,
        },
        {
          key: "goodsPurchase",
          name: "tabs.addGoodsPurchase",
          component: <GoodsPurchase />,
        },
        {
          key: "purchaseReport",
          name: "tabs.report",
          component: <PurchaseReport />,
        },
      ]
    : [];

  return <CustomTab tabs={tabs} />;
};

export default Purchase;
