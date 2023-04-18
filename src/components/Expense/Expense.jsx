import React from "react";
import CustomTab from "../CustomTab";
import ExpenseType from "./ExpenseType";
import LogExpense from "./LogExpense";
import ExpenseReport from "./ExpenseReport";

const tabs = [
  {
    key: "addExpenseType",
    name: "Add Expense Type",
    component: <ExpenseType />,
  },
  {
    key: "logExpense",
    name: "Log Expense",
    component: <LogExpense />,
  },
  {
    key: "expenseReport",
    name: "Report Book",
    component: <ExpenseReport />,
  },
];

const Expense = () => {
  return <CustomTab tabs={tabs} />;
};

export default Expense;
