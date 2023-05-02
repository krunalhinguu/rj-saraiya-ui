import moment from "moment";
import React, { useEffect, useState } from "react";
import { DATE_FORMAT } from "../../data/const";
import { NumericFormat } from "react-number-format";
import { instance } from "../../server";
import { useFormik } from "formik";
import styles from "../../styles/styles";
import ReactDatePicker from "react-datepicker";
import ButtonSpinner from "../ButtonSpinner";
import Spinner from "../Spinner";
import { useTranslation } from "react-i18next";

// table header
const headers = [
  {
    key: "expenseType",
    name: "common.expenseType",
  },
  {
    key: "details",
    name: "common.details",
  },
  {
    key: "date",
    name: "common.date",
  },
  {
    key: "price",
    name: "common.amount",
  },
];

const ExpenseReport = () => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [type, setType] = useState();
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    fetchAllDealers();
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

  const fetchAllDealers = async () => {
    instance
      .get("expense/type/all")
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          setTypes(data.body);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleExchangeTypeChange = async (e) => {
    const expenseId = e.target.value;

    setIsDataLoading(true);
    setType(expenseId);

    await instance
      .get(`expense/filter/type/${expenseId}`)
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

  const getTotalExpense = () => {
    const totalExpense =
      data && data.length > 0 && data.reduce((prev, d) => d.price + prev, 0);

    return totalExpense || 0;
  };

  // formik
  const formik = useFormik({
    initialValues: {
      startDate: new Date(),
      endDate: new Date(),
    },
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      instance
        .post("expense/filter/date", values)
        .then(({ data }) => {
          if (data.responseCode === "OK") {
            setData(data.body);
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
            {/* expense name */}
            <div>
              <span className={`${styles.label}`}>
                {t("common.expenseType")}
              </span>
              <select
                id="dealer"
                className={`${styles.inputSelect}`}
                value={type}
                onChange={handleExchangeTypeChange}
              >
                <option>Choose Expense Type</option>
                {types &&
                  types.length > 0 &&
                  types.map((t, i) => (
                    <option key={i} value={t.id}>
                      {t.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* start date */}
            <div>
              <span className={`${styles.label}`}>{t("common.startDate")}</span>
              <ReactDatePicker
                showMonthDropdown
                showYearDropdown
                type="text"
                name="startDate"
                dateFormat="dd/MM/yyyy"
                className={`${styles.input}`}
                selected={formik.values.startDate}
                onFocus={(e) => e.target.select()}
                onChange={(date) => formik.setFieldValue("startDate", date)}
              />
            </div>

            {/* end date */}
            <div>
              <span className={`${styles.label}`}>{t("common.endDate")}</span>
              <ReactDatePicker
                showMonthDropdown
                showYearDropdown
                type="text"
                name="endDate"
                dateFormat="dd/MM/yyyy"
                className={`${styles.input}`}
                selected={formik.values.endDate}
                minDate={formik.values.startDate}
                onChange={(date) => formik.setFieldValue("endDate", date)}
                onFocus={(e) => e.target.select()}
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
          {data && data.length > 0 ? (
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
                        {d.expenseType}
                      </th>

                      <td className="px-6 py-4">{d.details}</td>
                      <td className="px-6 py-4">
                        {moment(d.date).format(DATE_FORMAT)}
                      </td>
                      <td className="px-6 py-4">
                        <NumericFormat
                          value={d.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₹"}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr className="font-semibold text-gray-900 dark:text-white">
                  <th scope="row" className="px-6 py-3 text-base">
                    {t("common.total")}
                  </th>
                  <td className="px-6 py-3"></td>
                  <td className="px-6 py-3"></td>
                  <td className="px-6 py-3">
                    {
                      <NumericFormat
                        value={getTotalExpense()}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₹"}
                      />
                    }
                  </td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <div className="flex justify-center items-center">
              <span className="font-bold text-gray-400 text-lg">
                {t("common.noData")}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpenseReport;
