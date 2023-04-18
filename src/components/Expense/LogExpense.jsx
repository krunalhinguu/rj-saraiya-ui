import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ReactDatePicker from "react-datepicker";
import * as Yup from "yup";
import { useFormik } from "formik";
import { instance } from "../../server";
import CustomDialoag from "../CustomDialoag";
import moment from "moment";
import { DATE_FORMAT } from "../../data/const";
import Spinner from "../Spinner";
import ButtonSpinner from "../ButtonSpinner";
import { NumericFormat } from "react-number-format";

// validation
const formSchema = Yup.object().shape({
  price: Yup.number().required("price is required"),
  expenseType: Yup.number().required("expense type is required"),
});

// table header
const headers = [
  {
    key: "expenseType",
    name: "expense type",
  },
  {
    key: "price",
    name: "price",
  },
  {
    key: "details",
    name: "details",
  },
  {
    key: "date",
    name: "date",
  },
  {
    key: "actions",
    name: "actions",
  },
];

const LogExpense = () => {
  const [id, setId] = useState();
  const [data, setData] = useState([]);
  const [types, setTypes] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    fetchAllexpenseTypes();
    fetchAll();
  }, []);

  // handlers
  const fetchAll = async () => {
    setIsDataLoading(true);
    await instance
      .get("expense")
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

  const fetchAllexpenseTypes = async () => {
    instance
      .get("expense/type")
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          setTypes(data.body);
        }
      })
      .catch((error) => console.error(error));
  };

  const deleteData = () => {
    instance
      .delete(`expense/${id}`)
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          fetchAll();
          setIsDialogOpen(false);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = async (d) => {
    formik.setFieldValue("id", d.id);
    formik.setFieldValue("expenseType", d.expenseTypeId);
    formik.setFieldValue("price", d.price);
    formik.setFieldValue("details", d.details);
  };

  const handleDelete = (id) => {
    setId(id);
    setIsDialogOpen(true);
  };

  // formik
  const formik = useFormik({
    initialValues: {
      expenseType: "",
      price: "",
      details: "",
      date: new Date(),
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);

      instance
        .post("expense", values)
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
            {/* expense type */}
            <div>
              <span className={`${styles.label}`}>expense Type</span>
              <select
                id="expenseType"
                className={`${styles.inputSelect}`}
                value={formik.values.expenseType}
                onChange={formik.handleChange}
              >
                <option>Choose Expense Type</option>
                {types.map((t, i) => (
                  <option key={i} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              {formik.errors.expenseType ? (
                <div className={`${styles.error}`}>
                  {formik.errors.expenseType}
                </div>
              ) : null}
            </div>

            {/* price */}
            <div>
              <span className={`${styles.label}`}>Price</span>
              <input
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.select()}
                className={`${styles.input}`}
                placeholder="₹ 50, 100, 1000"
              />
              {formik.errors.price ? (
                <div className={`${styles.error}`}>{formik.errors.price}</div>
              ) : null}
            </div>

            {/* details */}
            <div>
              <span className={`${styles.label}`}>Details</span>
              <input
                type="text"
                name="details"
                value={formik.values.details}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.select()}
                className={`${styles.input}`}
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
                placeholder="Enter Details About expense"
              />
            </div>
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
                      {d.expenseType}
                    </th>

                    <td className="px-6 py-4">
                      <NumericFormat
                        value={d.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₹"}
                      />
                    </td>
                    <td className="px-6 py-4">{d.details}</td>
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

export default LogExpense;
