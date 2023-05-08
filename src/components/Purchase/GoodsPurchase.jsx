import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { NumericFormat } from "react-number-format";
import { instance } from "../../server";
import { DATE_FORMAT } from "../../data/const";
import { useTranslation } from "react-i18next";

import ReactDatePicker from "react-datepicker";
import moment from "moment";
import ButtonSpinner from "../ButtonSpinner";
import * as Yup from "yup";

import styles from "../../styles/styles";
import Spinner from "../Spinner";
import CustomDialoag from "../CustomDialoag";
import { useSelector } from "react-redux";
import { ReactTransliterate } from "react-transliterate";
import { date } from "../../utils/common";

// validation
const formSchema = Yup.object().shape({
  name: Yup.string().required("Required Field"),
  dealer: Yup.number().required("Required Field"),
  items: Yup.number().required("Required Field"),
  amount: Yup.number().required("Required Field"),
});

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
    key: "date",
    name: "common.date",
  },
  {
    key: "actions",
    name: "",
  },
];

const GoodsPurchase = () => {
  const { t } = useTranslation();

  const props = useSelector((state) => state);
  const { navigation } = props;
  const { lang } = navigation;

  const [id, setId] = useState();
  const [data, setData] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAllDealers();
    fetchAll();
  }, []);

  useEffect(() => {
    fetchAll();
  }, [currentPage]);

  const handlePaymentStatus = (e) => {
    const status = e.target.value;

    formik.setFieldValue("paymentStatus", status);

    if (status === "paid")
      formik.setFieldValue("amountPaid", formik.values.amount);
    if (status === "unpaid") formik.setFieldValue("amountPaid", 0);
    if (status === "partialPaid") formik.setFieldValue("amountPaid", "");
  };

  // handlers
  const handlePrevious = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const fetchAll = async () => {
    setIsDataLoading(true);
    await instance
      .get(`purchase?page=${currentPage}`)
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          setTotalPages(data.body.totalPages);
          setData(data.body.content);
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

  const deleteData = () => {
    instance
      .delete(`purchase/${id}`)
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
    formik.setFieldValue("name", d.name);
    formik.setFieldValue("dealer", d.dealerId);
    formik.setFieldValue("details", d.details);
    formik.setFieldValue("items", d.items);
    formik.setFieldValue("quantityType", d.quantityType);
    formik.setFieldValue("amount", d.amount);
    formik.setFieldValue("paymentStatus", d.paymentStatus);
    formik.setFieldValue("amountPaid", d.amountPaid);
  };

  const handleDelete = (id) => {
    setId(id);
    setIsDialogOpen(true);
  };

  // formik
  const formik = useFormik({
    initialValues: {
      name: "",
      details: "",
      dealer: "",
      items: "",
      quantityType: "",
      amount: "",
      paymentStatus: "",
      amountPaid: "",
      date: date,
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);

      instance
        .post("purchase", values)
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
            {/* dealer name */}
            <div>
              <span className={`${styles.label}`}>
                {t("common.dealerName")}
              </span>
              <select
                id="dealer"
                className={`${styles.inputSelect}`}
                value={formik.values.dealer}
                onChange={formik.handleChange}
              >
                <option>Choose Dealer Name</option>
                {dealers.map((t, i) => (
                  <option key={i} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              {formik.errors.dealer && formik.touched.dealer ? (
                <div className={`${styles.error}`}>{formik.errors.dealer}</div>
              ) : null}
            </div>

            {/* goods name */}
            <div>
              <span className={`${styles.label}`}>{t("common.goods")}</span>
              <ReactTransliterate
                value={formik.values.name}
                onChangeText={(text) => formik.setFieldValue("name", text)}
                className={`${styles.input}`}
                onFocus={(e) => e.target.select()}
                lang={lang}
                enabled={lang === "gu"}
              />
              {formik.errors.name && formik.touched.name ? (
                <div className={`${styles.error}`}>{formik.errors.name}</div>
              ) : null}
            </div>

            {/* details */}
            <div>
              <span className={`${styles.label}`}>{t("common.details")}</span>
              <ReactTransliterate
                value={formik.values.details}
                onChangeText={(text) => formik.setFieldValue("details", text)}
                className={`${styles.input}`}
                onFocus={(e) => e.target.select()}
                lang={lang}
                enabled={lang === "gu"}
              />
            </div>

            {/* total items */}
            <div>
              <span className={`${styles.label}`}>
                {t("common.itemsCount")}
              </span>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  name="items"
                  value={formik.values.items}
                  onChange={formik.handleChange}
                  className={`${styles.input} pr-20`}
                  placeholder="1 kg, 100 pcs, 300 items"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <select
                    name="quantityType"
                    className={`${styles.inputSelect} border-0`}
                    value={formik.values.quantityType}
                    onChange={formik.handleChange}
                  >
                    <option>quantity</option>
                    <option value="pcs">{t("common.piece")}</option>
                    <option value="kg">{t("common.kg")}</option>
                    {/* <option>items</option> */}
                  </select>
                </div>
              </div>
              {formik.errors.items && formik.touched.items ? (
                <div className={`${styles.error}`}>{formik.errors.items}</div>
              ) : null}
            </div>

            {/* amount */}
            <div>
              <span className={`${styles.label}`}>
                {t("common.totalAmount")}
              </span>
              <input
                type="number"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.select()}
                className={`${styles.input}`}
                placeholder="₹ 10000, 20000"
              />
              {formik.errors.amount && formik.touched.amount ? (
                <div className={`${styles.error}`}>{formik.errors.amount}</div>
              ) : null}
            </div>

            {/* payment status */}
            <div>
              <span className={`${styles.label}`}>
                {t("common.paymentStatus")}
              </span>
              <select
                name="paymentStatus"
                className={`${styles.inputSelect}`}
                value={formik.values.paymentStatus}
                onChange={handlePaymentStatus}
              >
                <option>choose payment status</option>
                <option value="paid">paid</option>
                <option value="unpaid">unpaid</option>
                <option value="partialPaid">partial paid</option>
              </select>
            </div>

            {/* Amount Paid */}
            <div>
              <span className={`${styles.label}`}>
                {t("common.amountPaid")}
              </span>
              <input
                type="number"
                name="amountPaid"
                value={formik.values.amountPaid}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.select()}
                className={`${styles.input}`}
                placeholder="₹ 10000, 20000"
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
                        {moment(d.date).format(DATE_FORMAT)}
                      </td>
                      <td className="flex items-center px-6 py-4 space-x-3">
                        <button
                          className="font-medium text-blue-600  hover:underline"
                          onClick={() => handleEdit(d)}
                        >
                          Edit
                        </button>
                        <button
                          className="font-medium text-red-600  hover:underline"
                          onClick={() => handleDelete(d.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* pagination */}
            <div className="flex justify-end gap-1 m-3">
              <button
                disabled={currentPage === 0}
                onClick={handlePrevious}
                className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-red-700  "
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Previous
              </button>
              <button
                disabled={currentPage === totalPages - 1}
                onClick={handleNext}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-red-700  "
              >
                Next
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
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
  );
};

export default GoodsPurchase;
