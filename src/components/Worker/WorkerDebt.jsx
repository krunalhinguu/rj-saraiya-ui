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
import { useTranslation } from "react-i18next";

// validation
const formSchema = Yup.object().shape({
  worker: Yup.number().required("please select worker name"),
  amount: Yup.number().required("debt amount is required"),
});

// table header
const headers = [
  {
    key: "Worker",
    name: "common.workerName",
  },
  {
    key: "amount",
    name: "common.amount",
  },
  {
    key: "date",
    name: "common.date",
  },
  {
    key: "actions",
    name: "",
  },
];

const WorkerDebt = () => {
  const { t } = useTranslation();
  const [id, setId] = useState();
  const [data, setData] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    fetchAllWorkers();
    fetchAll();
  }, []);

  // handlers
  const fetchAll = async () => {
    setIsDataLoading(true);
    await instance
      .get("worker/debt")
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

  const fetchAllWorkers = async () => {
    instance
      .get("worker")
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          setWorkers(data.body);
        }
      })
      .catch((error) => console.error(error));
  };

  const deleteData = () => {
    instance
      .delete(`worker/debt/${id}`)
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
    formik.setFieldValue("worker", d.workerId);
    formik.setFieldValue("amount", d.price);
  };

  const handleDelete = (id) => {
    setId(id);
    setIsDialogOpen(true);
  };

  // formik
  const formik = useFormik({
    initialValues: {
      worker: "",
      amount: "",
      date: new Date(),
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);

      instance
        .post("worker/debt", values)
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
            {/* product type */}
            <div>
              <span className={`${styles.label}`}>
                {t("common.workerName")}
              </span>
              <select
                id="worker"
                className={`${styles.inputSelect}`}
                value={formik.values.worker}
                onChange={formik.handleChange}
              >
                <option>Choose Worker</option>
                {workers.map((w, i) => (
                  <option key={i} value={w.id}>
                    {w.name}
                  </option>
                ))}
              </select>
              {formik.errors.worker ? (
                <div className={`${styles.error}`}>{formik.errors.worker}</div>
              ) : null}
            </div>

            {/* amount */}
            <div>
              <span className={`${styles.label}`}>{t("common.amount")}</span>
              <input
                type="number"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.select()}
                className={`${styles.input}`}
              />
              {formik.errors.amount ? (
                <div className={`${styles.error}`}>{formik.errors.amount}</div>
              ) : null}
            </div>

            {/* date */}
            <div>
              <span className={`${styles.label}`}>{t("common.date")}</span>
              <ReactDatePicker
                disabled
                type="text"
                name="date"
                dateFormat="dd/MM/yyyy"
                selected={formik.values.date}
                onFocus={(e) => e.target.select()}
                className={`${styles.input}`}
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
              {isLoading ? <ButtonSpinner /> : t("common.submit")}
            </button>
            {/* clear */}
            <button className={`${styles.buttonSecondary}`} type="reset">
              {t("common.clear")}
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
            <thead className="text-md  uppercase bg-red-100 text-slate-500">
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
                data.map((d, i) => (
                  <tr
                    key={d.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-red-50 "
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {d.workerName}
                    </th>

                    <td className="px-6 py-4">{d.amount}</td>
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

export default WorkerDebt;
