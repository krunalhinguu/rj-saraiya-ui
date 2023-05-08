import React, { useState } from "react";
import { Tab } from "@headlessui/react";

import ViewOrder from "./ViewOrder";
import OrderBook from "./OrderBook";
import Order from "./Order";
import CustomTab from "../CustomTab";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCurrentCustomerTab } from "../../redux/actions/CommonSlice";

const Customer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const props = useSelector((state) => state);
  const { common } = props;
  const { currentCustomerTab } = common;

  // const [selectedIndex, setSelectedIndex] = useState(currentCustomerTab);
  const user = useSelector((state) => state.user?.data);
  const isAdmin = user?.role?.toLowerCase() === "admin";

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function changeTab(tab) {
    dispatch(setCurrentCustomerTab({ tab: tab }));
  }

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
      ];

  return (
    <div>
      <div className="container-fluid m-2 mt-4">
        <div className="w-full sm:px-0">
          {/* tab header */}
          <Tab.Group selectedIndex={currentCustomerTab} onChange={changeTab}>
            <Tab.List className="flex space-x-1 rounded-xl bg-red-100 p-1">
              {tabs &&
                tabs.map((tab) => (
                  <Tab
                    key={tab.key}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#e40414]",
                        "ring-white ring-opacity-60 focus:outline-none focus:ring-2",
                        selected
                          ? "bg-white shadow"
                          : "text-slate-500 hover:bg-red-600/[0.12] hover:text-slate-900/90",
                      )
                    }
                  >
                    {t(tab.name)}
                  </Tab>
                ))}
            </Tab.List>
            {/* tab content */}
            <Tab.Panels className="mt-2">
              {tabs &&
                tabs.map((tab) => (
                  <Tab.Panel key={tab.key} className={classNames("p-3")}>
                    {tab.component}
                  </Tab.Panel>
                ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default Customer;
