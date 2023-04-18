import React from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CustomTab = ({ tabs }) => {
  return (
    <div className="container-fluid m-2 mt-4">
      <div className="w-full sm:px-0">
        {/* tab header */}
        <Tab.Group>
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
                  {tab.name}
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
  );
};

export default CustomTab;
