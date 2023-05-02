import React from "react";
import CreateUser from "../components/CreateUser";
import Header from "../components/Header";

const UserPage = () => {
  return (
    <div className="w-full h-screen">
      <Header />
      <CreateUser />
    </div>
  );
};

export default UserPage;
