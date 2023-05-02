import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import ButtonSpinner from "../ButtonSpinner";
import Spinner from "../Spinner";
import ReactDatePicker from "react-datepicker";
import styles from "../../styles/styles";
import moment from "moment";
import { DATE_FORMAT } from "../../data/const";
import { instance } from "../../server";
import { useTranslation } from "react-i18next";

// table header
const headers = [
  {
    key: "date",
    name: "common.date",
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
    key: "expenceTotal",
    name: "common.expenseTotal",
  },
  // {
  //   key: "totalAmount",
  //   name: "common.totalAmount",
  // },
];

const ReportBook = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const getTotalAmount = () => {
    const totalExpense =
      data &&
      data.length > 0 &&
      data.reduce((prev, d) => d.expenseTotal + prev, 0);

    return totalExpense || 0;
  };

  const getGallAmount = () => {
    const gallaAmount =
      data &&
      data.length > 0 &&
      data.reduce((prev, d) => d.gallaAmount + prev, 0);

    return gallaAmount || 0;
  };

  const getMandirAmount = () => {
    const mandirAmount =
      data &&
      data.length > 0 &&
      data.reduce((prev, d) => d.mandirAmount + prev, 0);

    return mandirAmount || 0;
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
        .post("report/filter/date", values)
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
            {/* start date */}
            <div>
              <span className={`${styles.label}`}>{t("common.startDate")}</span>
              <ReactDatePicker
                showYearDropdown
                showMonthDropdown
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
                showYearDropdown
                showMonthDropdown
                type="text"
                name="endDate"
                dateFormat="dd/MM/yyyy"
                className={`${styles.input}`}
                selected={formik.values.endDate}
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
                      className="bg-white border-b   hover:bg-red-50 "
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {moment(d.date).format(DATE_FORMAT)}
                      </th>
                      <td className="px-6 py-4">{d.gallaAmount}</td>
                      <td className="px-6 py-4">{d.mandirAmount}</td>
                      <td className="px-6 py-4">{d.expenseTotal}</td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr className="font-semibold text-gray-900 ">
                  <td className="px-6 py-3"></td>
                  <td className="px-6 py-3">
                    <NumericFormat
                      value={getGallAmount()}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                    />
                  </td>
                  <td className="px-6 py-3">
                    <NumericFormat
                      value={getMandirAmount()}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                    />
                  </td>
                  <td className="px-6 py-3">
                    <NumericFormat
                      value={getTotalAmount()}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                    />
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

export default ReportBook;
