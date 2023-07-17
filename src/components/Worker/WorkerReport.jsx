import React, { useState } from "react";

import DebtReport from "./DebtReport";
import AttendanceReport from "./AttendanceReport";
import CalculateSalary from "./CalculateSalary";
import { useTranslation } from "react-i18next";

const WorkerReport = () => {
  const { t } = useTranslation();
  const [reportType, setReportType] = useState("salary");

  // handlers
  const handleRadioChange = (e) => {
    const value = e.target.value;

    if (value === "debt") setReportType("debt");
    if (value === "salary") setReportType("salary");
    if (value === "attendance") setReportType("attendance");
  };

  return (
    <div className="container-fluid">
      {/* options */}
      <div
        className="flex gap-4 p-4 justify-centeritems-center  border border-gray-200 rounded"
        onChange={(e) => handleRadioChange(e)}
      >
        <div className="flex items-center">
          <input
            id="country-option-1"
            type="radio"
            name="report"
            value="salary"
            defaultChecked
            className="w-4 h-4   border-red-300 focus:ring-2 focus:ring-red-300"
          />
          <label
            htmlFor="country-option-1"
            className="block ml-2 text-sm text-slate-600 font-bold "
          >
            {t("tabs.calculateSalary")}
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="country-option-2"
            type="radio"
            name="report"
            value="debt"
            className="w-4 h-4   border-red-300 focus:ring-2 focus:ring-red-300"
          />
          <label
            htmlFor="country-option-2"
            className="block ml-2 text-sm text-slate-600 font-bold "
          >
            {t("tabs.debtReport")}
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="country-option-3"
            type="radio"
            name="report"
            value="attendance"
            className="w-4 h-4 border-red-300 focus:ring-2 focus:ring-red-300 "
          />
          <label
            htmlFor="country-option-3"
            className="block ml-2 text-sm text-slate-600 font-bold "
          >
            {t("tabs.attendanceReport")}
          </label>
        </div>
      </div>

      {reportType === "debt" && <DebtReport />}
      {reportType === "salary" && <CalculateSalary />}
      {reportType === "attendance" && <AttendanceReport />}
    </div>
  );
};

export default WorkerReport;
