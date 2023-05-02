import { useFormik } from "formik";
import React, { useState } from "react";
import styles from "../../styles/styles";
import { NumericFormat } from "react-number-format";
import ReactDatePicker from "react-datepicker";
import { instance } from "../../server";
import { Spinner } from "react-bootstrap";
import ButtonSpinner from "../ButtonSpinner";
import moment from "moment";
import { DATE_FORMAT } from "../../data/const";
import { useTranslation } from "react-i18next";

// table header
const headers = [
  {
    key: "invoiceNo",
    name: "common.invoiceNo",
  },
  {
    key: "date",
    name: "common.date",
  },
  {
    key: "customerName",
    name: "common.customerName",
  },
  {
    key: "mobileNo",
    name: "common.mobileNo",
  },
  {
    key: "generatedBy",
    name: "common.generatedBy",
  },
  {
    key: "paidBy",
    name: "common.paidBy",
  },
  {
    key: "totalAmount",
    name: "common.totalAmount",
  },
];

const OrderBook = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const getTotalDebt = () => {
    const totalExpense =
      data &&
      data.length > 0 &&
      data.reduce((prev, d) => d.totalAmount + prev, 0);

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
        .post("order/filter/date", values)
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
                type="text"
                name="startDate"
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                showMonthDropdown
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
                type="text"
                name="endDate"
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                showMonthDropdown
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
              <thead className="text-xs  uppercase bg-red-100 text-slate-500">
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
                      className="bg-white border-b  hover:bg-red-50 "
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {d.invoiceNo}
                      </th>

                      <td className="px-6 py-4">
                        {moment(d.date).format(DATE_FORMAT)}
                      </td>
                      <td className="px-6 py-4">{d.customer.name}</td>
                      <td className="px-6 py-4">
                        {d.customer.mobileNo && `+91-${d.customer.mobileNo}`}
                      </td>
                      <td className="px-6 py-4">{d.generatedBy}</td>
                      <td className="px-6 py-4">{d.paidBy}</td>
                      <td className="px-6 py-4">
                        <NumericFormat
                          value={d.totalAmount}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₹"}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr className="font-semibold text-gray-900">
                  <th scope="row" className="px-6 py-3 text-base">
                    {t("common.total")}
                  </th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>

                  <td className="px-6 py-3">
                    {
                      <NumericFormat
                        value={getTotalDebt()}
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

export default OrderBook;
