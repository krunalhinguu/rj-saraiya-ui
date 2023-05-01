import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { instance } from "../../server";
import moment from "moment";
import { DATE_FORMAT } from "../../data/const";
import ReactDatePicker from "react-datepicker";
import CustomDialoag from "../CustomDialoag";
import Spinner from "../Spinner";
import ButtonSpinner from "../ButtonSpinner";
import { NumericFormat } from "react-number-format";
import { useTranslation } from "react-i18next";

// table header
const headers = [
  {
    key: "totalAmount",
    name: "common.totalAmount",
  },
  {
    key: "gallaMa",
    name: "common.gallama",
  },
  {
    key: "mandirMa",
    name: "common.mandirMa",
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

const LogReport = () => {
  const { t } = useTranslation();

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
      .get("report")
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
      .delete(`report/${id}`)
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
    formik.setFieldValue("totalAmount", d.totalAmount);
    formik.setFieldValue("gallaAmount", d.gallaAmount);
    formik.setFieldValue("mandirAmount", d.mandirAmount);
  };

  const handleDelete = (id) => {
    setId(id);
    setIsDialogOpen(true);
  };

  // formik
  const formik = useFormik({
    initialValues: {
      totalAmount: "",
      gallaAmount: "",
      mandirAmount: "",
      date: new Date(),
    },
    // validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);

      // calculating total value
      values.totalAmount = values.gallaAmount + values.mandirAmount;

      instance
        .post("report", values)
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
            {/* Galla Amount */}
            <div>
              <span className={`${styles.label}`}>{t("common.gallama")}</span>
              <input
                type="number"
                name="gallaAmount"
                value={formik.values.gallaAmount}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.select()}
                className={`${styles.input}`}
                placeholder="₹"
              />
            </div>

            {/* Mandir Amount */}
            <div>
              <span className={`${styles.label}`}>{t("common.mandirMa")}</span>
              <input
                type="number"
                name="mandirAmount"
                value={formik.values.mandirAmount}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.select()}
                className={`${styles.input}`}
                placeholder="₹"
              />
            </div>

            {/* Total Amount */}
            <div>
              <span className={`${styles.label}`}>
                {t("common.totalAmount")}
              </span>
              <input
                disabled
                type="number"
                name="totalAmount"
                value={formik.values.gallaAmount + formik.values.mandirAmount}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.select()}
                className={`${styles.input}`}
                placeholder="₹"
              />
            </div>

            {/* date */}
            <div>
              <span className={`${styles.label}`}>{t("common.date")}</span>
              <ReactDatePicker
                disabled
                name="date"
                dateFormat="dd/MM/yyyy"
                placeholder="Enter Details About Product"
                selected={formik.values.date}
                onFocus={(e) => e.target.select()}
                className={`${styles.input}`}
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
                data.map((d, i) => (
                  <tr
                    key={d.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-red-50 "
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      <NumericFormat
                        value={d.totalAmount}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₹"}
                      />
                    </th>

                    <td className="px-6 py-4">
                      <NumericFormat
                        value={d.gallaAmount}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₹"}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <NumericFormat
                        value={d.mandirAmount}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₹"}
                      />
                    </td>
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

export default LogReport;
