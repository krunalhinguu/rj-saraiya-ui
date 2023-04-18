import React from "react";
import CustomTab from "../CustomTab";
import WorkerInfo from "./WorkerInfo";
import WorkerAttendance from "./WorkerAttendance";
import WorkerDebt from "./WorkerDebt";
import WorkerReport from "./WorkerReport";

const tabs = [
  {
    key: "addWorker",
    name: "Add Worker Info",
    component: <WorkerInfo />,
  },
  {
    key: "workerAttendance",
    name: "Attendance",
    component: <WorkerAttendance />,
  },
  {
    key: "workerDebt",
    name: "Debt",
    component: <WorkerDebt />,
  },
  {
    key: "workerReport",
    name: "Report",
    component: <WorkerReport />,
  },
];

const Worker = () => {
  return <CustomTab tabs={tabs} />;
};

export default Worker;
