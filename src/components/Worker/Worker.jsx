import React from "react";
import CustomTab from "../CustomTab";
import WorkerInfo from "./WorkerInfo";
import WorkerAttendance from "./WorkerAttendance";
import WorkerDebt from "./WorkerDebt";
import WorkerReport from "./WorkerReport";
import { useSelector } from "react-redux";

const Worker = () => {
  const user = useSelector((state) => state.user?.data);
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const tabs = isAdmin
    ? [
        {
          key: "addWorker",
          name: "tabs.addWorkerInfo",
          component: <WorkerInfo />,
        },
        {
          key: "workerAttendance",
          name: "tabs.attendance",
          component: <WorkerAttendance />,
        },
        {
          key: "workerDebt",
          name: "tabs.debt",
          component: <WorkerDebt />,
        },
        {
          key: "workerReport",
          name: "tabs.report",
          component: <WorkerReport />,
        },
      ]
    : [
        {
          key: "workerAttendance",
          name: "tabs.attendance",
          component: <WorkerAttendance />,
        },
      ];
  return <CustomTab tabs={tabs} />;
};

export default Worker;
