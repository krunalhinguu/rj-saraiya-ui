import React from "react";
import CustomTab from "../CustomTab";
import ExpenseType from "./ExpenseType";
import LogExpense from "./LogExpense";
import ExpenseReport from "./ExpenseReport";
import { useSelector } from "react-redux";

const Expense = () => {
  const user = useSelector((state) => state.user?.data);
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const tabs = isAdmin
    ? [
        {
          key: "addExpenseType",
          name: "tabs.addExpenseType",
          component: <ExpenseType />,
        },
        {
          key: "logExpense",
          name: "tabs.logExpense",
          component: <LogExpense />,
        },
        {
          key: "expenseReport",
          name: "tabs.report",
          component: <ExpenseReport />,
        },
      ]
    : [
        {
          key: "logExpense",
          name: "tabs.logExpense",
          component: <LogExpense />,
        },
      ];
  return <CustomTab tabs={tabs} />;
};

export default Expense;
