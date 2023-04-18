import React from "react";
import CustomTab from "../CustomTab";
import Dealer from "./Dealer";

const tabs = [
  {
    key: "addDealer",
    name: "Add Dealer Info",
    component: <Dealer />,
  },
];

const Purchase = () => {
  return <CustomTab tabs={tabs} />;
};

export default Purchase;
