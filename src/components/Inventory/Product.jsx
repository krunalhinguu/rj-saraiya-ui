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

// validation
const formSchema = Yup.object().shape({
  productName: Yup.string().required("product name is required"),
  productType: Yup.number().required("product type is required"),
  productSubType: Yup.number().required("product sub type is required"),
  stockRoom: Yup.string().required("stock room is required"),
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
    key: "stockRoom",
    name: "common.stockRoom",
  },
  {
    key: "price",
    name: "common.amount",
  },
  {
    key: "totalStock",
    name: "common.totalStock",
  },
  {
    key: "totalValue",
    name: "common.totalAmount",
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

  useEffect(() => {
    fetchAll();
    fetchAllProductTypes();
  }, []);

  // handlers
  const fetchAll = async () => {
    setIsDataLoading(true);
    await instance
      .get("products")
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

  const fetchAllProductTypes = async () => {
    instance
      .get("products/type")
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
    formik.setFieldValue("stockRoom", d.stockRoom);
    formik.setFieldValue("price", d.price);
    formik.setFieldValue("totalStock", d.totalStock);
    formik.setFieldValue("size", d.size);
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
      stockRoom: "",
      price: "",
      totalStock: "",
      size: "",
      typeOfQuantity: "pcs",
      details: "",
      date: new Date(),
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
              {formik.errors.productType ? (
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
              {formik.errors.productSubType ? (
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
              {formik.errors.productName ? (
                <div className={`${styles.error}`}>
                  {formik.errors.productName}
                </div>
              ) : null}
            </div>

            {/* stock room */}
            <div>
              <span className={`${styles.label}`}>{t("common.stockRoom")}</span>
              <select
                id="stockRoom"
                className={`${styles.inputSelect}`}
                value={formik.values.stockRoom}
                onChange={formik.handleChange}
              >
                <option>Choose Stock Room</option>
                <option value="home">{t("common.home")}</option>
                <option value="shop">{t("common.shop")}</option>
                <option value="warehouse">{t("common.warehouse")}</option>
              </select>
              {formik.errors.stockRoom ? (
                <div className={`${styles.error}`}>
                  {formik.errors.stockRoom}
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
            </div>

            {/* total stock */}
            <div>
              <span className={`${styles.label}`}>
                {t("common.totalStock")}
              </span>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  name="totalStock"
                  value={formik.values.totalStock}
                  onChange={formik.handleChange}
                  className={`${styles.input} pr-20`}
                  placeholder="1 kg, 100 pcs, 300 items"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label htmlFor="currency" className="sr-only">
                    Currency
                  </label>
                  <select
                    name="typeOfQuantity"
                    className={`${styles.inputSelect} border-0 border-transparent bg-transparent `}
                    value={formik.values.typeOfQuantity}
                    onChange={formik.handleChange}
                  >
                    <option>choose</option>
                    <option value="piece">{t("common.piece")}</option>
                    <option value="kg">{t("common.kg")}</option>
                  </select>
                </div>
              </div>
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
            {formik.errors.date ? (
              <div className={`${styles.error}`}>{formik.errors.date}</div>
            ) : null}
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
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-red-50 "
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
                    <td className="px-6 py-4">{d.stockRoom}</td>
                    <td className="px-6 py-4">
                      <NumericFormat
                        value={d.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₹"}
                      />
                    </td>
                    <td className="px-6 py-4">
                      {`${d.totalStock} ${d.typeOfQuantity}`}
                    </td>
                    <td className="px-6 py-4">
                      <NumericFormat
                        value={d.totalValue}
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

export default Product;
