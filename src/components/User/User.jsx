import React from "react";
import CustomTab from "../CustomTab";

import { useSelector } from "react-redux";
import CreateUser from "./CreateUser";
import ManageUser from "./ManageUser";

const User = () => {
  const user = useSelector((state) => state.user?.data);
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const tabs = isAdmin
    ? [
        {
          key: "createUser",
          name: "tabs.createUser",
          component: <CreateUser />,
        },
        {
          key: "manageUserS",
          name: "tabs.manageUser",
          component: <ManageUser />,
        },
      ]
    : [];
  return <CustomTab tabs={tabs} />;
};

export default User;
