import React, { useEffect, useState } from "react";

import { instance } from "../../server";
import moment from "moment";
import { DATE_FORMAT } from "../../data/const";
import ReactDatePicker from "react-datepicker";
import CustomDialoag from "../CustomDialoag";
import Spinner from "../Spinner";
import ButtonSpinner from "../ButtonSpinner";
import { NumericFormat } from "react-number-format";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useSelector } from "react-redux";

// table header
const headers = [
  {
    key: "name",
    name: "common.name",
  },
  {
    key: "userName",
    name: "common.username",
  },
  {
    key: "password",
    name: "common.password",
  },

  {
    key: "actions",
    name: "",
  },
];

const ManageUser = () => {
  const { t } = useTranslation();
  const [id, setId] = useState();
  const [data, setData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  // handlers
  const fetchAll = async () => {
    setIsDataLoading(true);
    await instance
      .get("user")
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          setData(data.body);
        }
        setIsDataLoading(false);
      })
      .catch((error) => {
        setIsDataLoading(false);
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    setId(id);
    setIsDialogOpen(true);
  };

  const deleteData = async () => {
    instance
      .delete(`user/${id}`)
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          alert("worker deactivated succesfully");
          fetchAll();
          setIsDialogOpen(false);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div className="container-fluid">
        {/* table */}
        {isDataLoading ? (
          <Spinner />
        ) : (
          data &&
          data.length > 0 && (
            <div className="relative overflow-x-auto sm:rounded-lg mt-5">
              <table className="w-full text-sm text-left text-slate-500 ">
                <thead className="text-md uppercase bg-red-100 text-slate-500">
                  <tr>
                    {headers &&
                      headers.length > 0 &&
                      headers.map((header, i) => (
                        <th key={i} scope="col" className="px-6 py-3">
                          {t(header.name)}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.length > 0 &&
                    data.map(
                      (d, i) =>
                        d.role === "worker" && (
                          <tr
                            key={d.id}
                            className="bg-white border-b   hover:bg-red-50 "
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                              {d.name}
                            </th>
                            <td className="px-6 py-4"> {d.username}</td>
                            <td className="px-6 py-4">{d.password}</td>
                            <td className="flex items-center px-6 py-4 space-x-3">
                              <div className="flex gap-x-4">
                                <button
                                  className="font-medium text-red-600  hover:underline"
                                  onClick={() => handleDelete(d.id)}
                                >
                                  Deactivate
                                </button>
                              </div>
                            </td>
                          </tr>
                        ),
                    )}
                </tbody>
              </table>
            </div>
          )
        )}

        <div>
          {/* delete dialoag */}
          <CustomDialoag
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
            primaryText={"Confirm Delete"}
            secondaryText={"Do you really want to delete current data"}
            primaryButtonText={"Delete"}
            secondaryButtonText={"Cancel"}
            handleSuccess={deleteData}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
