import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ReactTransliterate } from "react-transliterate";
import { instance } from "../../server";
import { DATE_FORMAT } from "../../data/const";
import { NumericFormat } from "react-number-format";

import * as Yup from "yup";
import moment from "moment";
import ReactDatePicker from "react-datepicker";

import CustomDialoag from "../CustomDialoag";
import ButtonSpinner from "../ButtonSpinner";
import Spinner from "../Spinner";

import styles from "../../styles/styles";
import { date } from "../../utils/common";

// validation
const formSchema = Yup.object().shape({
  productType: Yup.number().required("Required Field"),
  productSubType: Yup.number().required("Required Field"),
  productName: Yup.string().required("Required Field"),
  price: Yup.number().required("Required Field"),
});

// table header
const headers = [
  {
    key: "productName",
    name: "common.productName",
  },
  {
    key: "productType",
    name: "common.productType",
  },
  {
    key: "productSubType",
    name: "common.productSubType",
  },
  {
    key: "price",
    name: "common.amount",
  },
  {
    key: "shopStock",
    name: "common.shopStock",
  },
  {
    key: "shopAmount",
    name: "common.shopValue",
  },
  {
    key: "godownStock",
    name: "common.godownStock",
  },
  {
    key: "shopAmount",
    name: "common.godownValue",
  },
  {
    key: "size",
    name: "common.size",
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
    key: "actions",
    name: "",
  },
];

const Product = () => {
  const { t } = useTranslation();

  const props = useSelector((state) => state);
  const { navigation } = props;
  const { lang } = navigation;

  const [id, setId] = useState();
  const [data, setData] = useState([]);
  const [types, setTypes] = useState([]);
  const [subTypes, setSubTypes] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAll();
    fetchAllProductTypes();
  }, []);

  useEffect(() => {
    fetchAll();
  }, [currentPage]);

  // handlers
  const handlePrevious = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const totalShopStockValue =
    data && data.length > 0 && data.reduce((prev, d) => d.shopValue + prev, 0);

  const totalGodownStockValue =
    data &&
    data.length > 0 &&
    data.reduce((prev, d) => d.godownValue + prev, 0);

  const fetchAll = async () => {
    setIsDataLoading(true);
    await instance
      .get(`products?page=${currentPage}`)
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

  const fetchAllProductTypes = async () => {
    instance
      .get("products/type/all")
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          setTypes(data.body);
        }
      })
      .catch((error) => console.error(error));
  };

  const fetchAllProductSubTypesByProductTpe = async (id) => {
    instance
      .get(`products/type/${id}/subtype`)
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          setSubTypes(data.body);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleProductTypeChange = (e) => {
    const value = e.target.value;
    formik.setFieldValue("productType", value);
    fetchAllProductSubTypesByProductTpe(value);
  };

  const deleteData = async () => {
    instance
      .delete(`products/${id}`)
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
    formik.setFieldValue("productName", d.productName);
    formik.setFieldValue("productType", d.productTypeId);
    formik.setFieldValue("productSubType", d.productSubTypeId);
    formik.setFieldValue("price", d.price);
    formik.setFieldValue("size", d.size);
    formik.setFieldValue("shopStock", d.shopStock);
    formik.setFieldValue("godownStock", d.godownStock);
    formik.setFieldValue("typeOfQuantity", d.typeOfQuantity);
    formik.setFieldValue("details", d.details);
    formik.setFieldValue("pinned", d.pinned);
  };

  const handleDelete = (id) => {
    setId(id);
    setIsDialogOpen(true);
  };

  // formik
  const formik = useFormik({
    initialValues: {
      productName: "",
      productType: "",
      productSubType: "",
      price: "",
      shopStock: "",
      godownStock: "",
      size: "",
      typeOfQuantity: "pcs",
      details: "",
      date: date,
      pinned: false,
    },
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      instance
        .post("products", values)
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
                {t("common.productType")}
              </span>
              <select
                id="productType"
                className={`${styles.inputSelect}`}
                value={formik.values.productType}
                onChange={(e) => handleProductTypeChange(e)}
              >
                <option>Choose Product Type</option>
                {types.map((t, i) => (
                  <option key={i} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              {formik.errors.productType && formik.touched.productType ? (
                <div className={`${styles.error}`}>
                  {formik.errors.productType}
                </div>
              ) : null}
            </div>

            {/* product sub type */}
            <div>
              <span className={`${styles.label}`}>
                {t("common.productSubType")}
              </span>
              <select
                id="productSubType"
                className={`${styles.inputSelect}`}
                value={formik.values.productSubType}
                onChange={formik.handleChange}
              >
                <option>Choose Product Sub Type</option>
                {subTypes.map((t, i) => (
                  <option key={i} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              {formik.errors.productSubType && formik.touched.productSubType ? (
                <div className={`${styles.error}`}>
                  {formik.errors.productSubType}
                </div>
              ) : null}
            </div>

            {/* product name */}
            <div>
              <span className={`${styles.label}`}>
                {t("common.productName")}
              </span>
              <ReactTransliterate
                value={formik.values.productName}
                onChangeText={(text) =>
                  formik.setFieldValue("productName", text)
                }
                className={`${styles.input}`}
                onFocus={(e) => e.target.select()}
                lang={lang}
                enabled={lang === "gu"}
              />
              {formik.errors.productName && formik.touched.productName ? (
                <div className={`${styles.error}`}>
                  {formik.errors.productName}
                </div>
              ) : null}
            </div>

            {/* price */}
            <div>
              <span className={`${styles.label}`}>{t("common.amount")}</span>
              <input
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.select()}
                className={`${styles.input}`}
                placeholder="₹ 100, 200, 300"
              />
              {formik.errors.price && formik.touched.price ? (
                <div className={`${styles.error}`}>{formik.errors.price}</div>
              ) : null}
            </div>

            {/* shop stock */}
            <div>
              <span className={`${styles.label}`}>{t("common.shopStock")}</span>
              <input
                type="number"
                name="shopStock"
                value={formik.values.shopStock}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.select()}
                className={`${styles.input}`}
                placeholder="₹ 100, 200, 300"
              />
            </div>

            {/* godown stock */}
            <div>
              <span className={`${styles.label}`}>
                {t("common.godownStock")}
              </span>
              <input
                type="number"
                name="godownStock"
                value={formik.values.godownStock}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.select()}
                className={`${styles.input}`}
                placeholder="₹ 100, 200, 300"
              />
            </div>

            {/* type of stock */}
            <div>
              <span className={`${styles.label}`}>
                {t("common.totalStock")}
              </span>

              <select
                name="typeOfQuantity"
                className={`${styles.inputSelect}`}
                value={formik.values.typeOfQuantity}
                onChange={formik.handleChange}
              >
                <option>choose quantity</option>
                <option value="piece">{t("common.piece")}</option>
                <option value="kg">{t("common.kg")}</option>
              </select>
            </div>

            {/* size */}
            <div>
              <span className={`${styles.label}`}>{t("common.size")}</span>
              <input
                type="text"
                name="size"
                value={formik.values.size}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.select()}
                className={`${styles.input}`}
                placeholder="small, medium, large"
              />
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
          </div>

          {/* whatsapp  */}
          <div className="flex items-center mx-2 mt-4 mb-2">
            <input
              name="pinned"
              id="pinned"
              type="checkbox"
              checked={formik.values.pinned}
              value={formik.values.pinned}
              className="w-4 h-4"
              onChange={formik.handleChange}
            />
            <label
              htmlFor="pinned"
              className="ml-2 text-sm text-slate-500 font-bold"
            >
              {t("common.frequentlyUsed")}
            </label>
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
                  data.map((d) => (
                    <tr
                      key={d.id}
                      className="bg-white border-b   hover:bg-red-50 "
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        <div className="flex">
                          {d.pinned && "📌 "}
                          {d.productName}
                        </div>
                      </th>

                      <td className="px-6 py-4">{d.productType}</td>
                      <td className="px-6 py-4">{d.productSubType}</td>
                      <td className="px-6 py-4">
                        <NumericFormat
                          value={d.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₹"}
                        />
                      </td>
                      <td className="px-6 py-4">
                        {shopStock && `${d.shopStock} ${d.typeOfQuantity}`}
                      </td>
                      <td className="px-6 py-4">
                        <NumericFormat
                          value={d.shopValue}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₹"}
                        />
                      </td>
                      <td className="px-6 py-4">
                        {godownStock && `${d.godownStock} ${d.typeOfQuantity}`}
                      </td>
                      <td className="px-6 py-4">
                        <NumericFormat
                          value={d.godownValue}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₹"}
                        />
                      </td>
                      <td className="px-6 py-4">{d.size}</td>
                      <td className="px-6 py-4">{d.details}</td>
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
              <tfoot>
                <tr className="font-semibold text-gray-900 ">
                  <th scope="row" className="px-6 py-3 text-base">
                    {t("common.total")}
                  </th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="px-6 py-3"></td>
                  <td className="px-6 py-3">
                    <NumericFormat
                      value={totalShopStockValue}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                    />
                  </td>
                  <td className="px-6 py-3"></td>
                  <td className="px-6 py-3">
                    <NumericFormat
                      value={totalGodownStockValue}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                    />
                  </td>
                  <td className="px-6 py-3"></td>
                </tr>
              </tfoot>
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

export default Product;
