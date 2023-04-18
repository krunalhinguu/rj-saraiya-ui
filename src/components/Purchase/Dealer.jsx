import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ReactDatePicker from "react-datepicker";
import { useFormik } from "formik";
import { instance } from "../../server";

import * as Yup from "yup";
import CustomDialoag from "../CustomDialoag";
import moment from "moment";
import { DATE_FORMAT } from "../../data/const";
import ButtonSpinner from "../ButtonSpinner";
import Spinner from "../Spinner";

// validation
const formSchema = Yup.object().shape({
  name: Yup.string().required("dealer name is required"),
  address: Yup.string().required("address is required"),
});

// table header
const headers = [
  {
    key: "name",
    name: "dealer name",
  },
  {
    key: "address",
    name: "address",
  },
  {
    key: "phone",
    name: "phone",
  },
  {
    key: "date",
    name: "recorded date",
  },
  {
    key: "actions",
    name: "actions",
  },
];

const Dealer = () => {
  const [id, setId] = useState();
  const [data, setData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  // handlers
  const fetchAll = async () => {
    setIsDataLoading(true);
    await instance
      .get("purchase/dealer")
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

  const deleteData = async () => {
    instance
      .delete(`purchase/dealer/${id}`)
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          fetchAll();
          setIsDialogOpen(false);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = (d) => {
    formik.setFieldValue("id", d.id);
    formik.setFieldValue("name", d.name);
    formik.setFieldValue("address", d.address);
    formik.setFieldValue("phone", d.phone);
  };

  const handleDelete = (id) => {
    setId(id);
    setIsDialogOpen(true);
  };

  // formik
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      date: new Date(),
    },
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      instance
        .post("purchase/dealer", values)
        .then(({ data }) => {
          if (data.responseCode === "OK") {
            fetchAll();
            resetForm();
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error(error);
        });
    },
  });

  return (
    <div className="container-fluid">
      <div className="rounded-lg border border-slate-300 p-3">
        {/* form */}
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            {/* name */}
            <div>
              <span className={`${styles.label}`}>Name</span>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.select()}
                className={`${styles.input}`}
                placeholder="Enter Product Type"
              />
              {formik.errors.name ? (
                <div className={`${styles.error}`}>{formik.errors.name}</div>
              ) : null}
            </div>

            {/* address */}
            <div>
              <span className={`${styles.label}`}>Address</span>
              <input
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.select()}
                className={`${styles.input}`}
                placeholder="Enter Address "
              />
            </div>

            {/* phone number */}
            <div>
              <span className={`${styles.label}`}>Phone No.</span>
              <input
                type="number"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.select()}
                className={`${styles.input}`}
                placeholder="Phone Number(10 Digits)"
              />
            </div>

            {/* date */}
            <div>
              <span className={`${styles.label}`}>Date</span>
              <ReactDatePicker
                disabled
                selected={formik.values.date}
                type="text"
                name="date"
                onFocus={(e) => e.target.select()}
                className={`${styles.input}`}
                placeholder="Enter Details About Product"
              />
            </div>
            {formik.errors.date ? (
              <div className={`${styles.error}`}>{formik.errors.date}</div>
            ) : null}
          </div>
          {/* buttons */}
          <div className="mt-6 mb-2">
            {/* save */}
            <button
              className={`${styles.buttonPrimary}`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <ButtonSpinner /> : "Submit"}
            </button>
            {/* clear */}
            <button className={`${styles.buttonSecondary}`} type="reset">
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* table */}
      {isDataLoading ? (
        <Spinner />
      ) : (
        <div className="relative overflow-x-auto sm:rounded-lg mt-5">
          <table className="w-full text-sm text-left text-slate-500 ">
            <thead className="text-xs  uppercase bg-red-100 text-slate-500">
              <tr>
                {headers &&
                  headers.length > 0 &&
                  headers.map((header, i) => (
                    <th key={i} scope="col" className="px-6 py-3">
                      {header.name}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data &&
                data.length > 0 &&
                data.map((d, i) => (
                  <tr
                    key={d.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-red-50 "
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {d.name}
                    </th>

                    <td className="px-6 py-4">{d.address}</td>
                    <td className="px-6 py-4">{`+91-${d.phone}`}</td>
                    <td className="px-6 py-4">
                      {moment(d.date).format(DATE_FORMAT)}
                    </td>
                    <td className="flex items-center px-6 py-4 space-x-3">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleEdit(d)}
                      >
                        Edit
                      </button>
                      <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => handleDelete(d.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
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
  );
};

export default Dealer;
