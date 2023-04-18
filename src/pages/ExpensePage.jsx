import React from "react";
import Header from "../components/Header";
import Expense from "../components/Expense/Expense";

const ExpensePage = () => {
  return (
    <div className="w-full h-screen">
      <Header />
      <Expense />
    </div>
  );
};

export default ExpensePage;
