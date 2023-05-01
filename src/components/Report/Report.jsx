import React from "react";
import LogReport from "./LogReport";
import ReportBook from "./ReportBook";
import CustomTab from "../CustomTab";
import { useSelector } from "react-redux";

const Report = () => {
  const user = useSelector((state) => state.user?.data);
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const tabs = isAdmin
    ? [
        {
          key: "addReport",
          name: "tabs.addDailyReport",
          component: <LogReport />,
        },
        {
          key: "reportBook",
          name: "tabs.dailyReportBook",
          component: <ReportBook />,
        },
      ]
    : [
        {
          key: "addReport",
          name: "tabs.addDailyReport",
          component: <LogReport />,
        },
      ];

  return <CustomTab tabs={tabs} />;
};

export default Report;
