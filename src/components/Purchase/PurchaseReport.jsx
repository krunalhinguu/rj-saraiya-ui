import moment from "moment";
import React, { useEffect, useState } from "react";
import { DATE_FORMAT } from "../../data/const";
import { NumericFormat } from "react-number-format";
import { instance } from "../../server";
import { useFormik } from "formik";
import styles from "../../styles/styles";
import ButtonSpinner from "../ButtonSpinner";
import ReactDatePicker from "react-datepicker";
import Spinner from "../Spinner";
import { useTranslation } from "react-i18next";
import { date, localDate } from "../../utils/common";

// table header
// table header
const headers = [
  {
    key: "name",
    name: "common.goods",
  },
  {
    key: "details",
    name: "common.details",
  },
  {
    key: "dealer",
    name: "common.dealerName",
  },
  {
    key: "items",
    name: "common.items",
  },
  {
    key: "amount",
    name: "common.amount",
  },
  {
    key: "paymentStatus",
    name: "common.paymentStatus",
  },
  {
    key: "amountPaid",
    name: "common.amountPaid",
  },
  {
    key: "amountUnpaid",
    name: "common.amountUnpaid",
  },
  {
    key: "date",
    name: "common.date",
  },
];

const PurchaseReport = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [dealer, setDealer] = useState(0);
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
      .get("purchase")
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
      .get("purchase/dealer/all")
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          setDealers(data.body);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDealerChange = (e) => {
    const dealerId = e.target.value;

    setIsDataLoading(true);
    setDealer(dealerId);

    instance
      .get(`purchase/filter/dealer/${dealerId}`)
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

  const getTotalPaidAmount = () => {
    const totalPaidAmount =
      data &&
      data.length > 0 &&
      data.reduce((prev, d) => d.amountPaid + prev, 0);
    return totalPaidAmount || 0;
  };

  const getTotalAmount = () => {
    const totalAmount =
      data && data.length > 0 && data.reduce((prev, d) => d.amount + prev, 0);
    return totalAmount || 0;
  };

  const geTotalUnpaidAmount = () => {
    const totalUnpaidAmount = getTotalAmount() - getTotalPaidAmount();
    return totalUnpaidAmount || 0;
  };

  // formik
  const formik = useFormik({
    initialValues: {
      startDate: date,
      endDate: date,
    },
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      instance
        .post("purchase/filter/date", values)
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
            {/* dealer name */}
            <div>
              <span className={`${styles.label}`}>Dealer Name</span>
              <select
                id="dealer"
                className={`${styles.inputSelect}`}
                value={dealer}
                onChange={handleDealerChange}
              >
                <option>Choose Dealer Name</option>
                {dealers &&
                  dealers.length > 0 &&
                  dealers.map((t, i) => (
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
                showYearDropdown
                showMonthDropdown
                type="text"
                name="startDate"
                dateFormat="dd/MM/yyyy"
                className={`${styles.input}`}
                selected={formik.values.startDate}
                onFocus={(e) => e.target.select()}
                onChange={(date) =>
                  formik.setFieldValue("startDate", localDate(date))
                }
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
                minDate={formik.values.startDate}
                onChange={(date) =>
                  formik.setFieldValue("endDate", localDate(date))
                }
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
                      className="bg-white border-b   hover:bg-red-50 "
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {d.name}
                      </th>

                      <td className="px-6 py-4">{d.details}</td>
                      <td className="px-6 py-4">{d.dealerName}</td>
                      <td className="px-6 py-4">
                        {`${d.items} ${d.quantityType}`}
                      </td>
                      <td className="px-6 py-4">
                        <NumericFormat
                          value={d.amount}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₹"}
                        />
                      </td>
                      <td className="px-6 py-4">{d.paymentStatus}</td>
                      <td className="px-6 py-4">
                        <NumericFormat
                          value={d.amountPaid}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₹"}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <NumericFormat
                          value={d.amount - d.amountPaid}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₹"}
                        />
                      </td>
                      <td className="px-6 py-4">
                        {moment(d.date).format(DATE_FORMAT)}
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr className="font-semibold text-gray-900 ">
                  <th scope="row" className="px-6 py-3 text-base">
                    {t("common.total")}
                  </th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="px-6 py-3">
                    {
                      <NumericFormat
                        value={getTotalAmount()}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₹"}
                      />
                    }
                  </td>
                  <td></td>
                  <td className="px-6 py-3">
                    {
                      <NumericFormat
                        value={getTotalPaidAmount()}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₹"}
                      />
                    }
                  </td>
                  <td className="px-6 py-3">
                    {
                      <NumericFormat
                        value={geTotalUnpaidAmount()}
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

export default PurchaseReport;
