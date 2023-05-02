import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { instance } from "../../server";
import { DATE_FORMAT } from "../../data/const";

import * as Yup from "yup";
import moment from "moment";
import ReactDatePicker from "react-datepicker";

import CustomDialoag from "../CustomDialoag";
import Spinner from "../Spinner";
import ButtonSpinner from "../ButtonSpinner";

import styles from "../../styles/styles";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ReactTransliterate } from "react-transliterate";

// validation
const formSchema = Yup.object().shape({
  name: Yup.string().required("Required Field"),
  productType: Yup.number().required("Required Field"),
});

// table header
const headers = [
  {
    key: "productSubType",
    name: "common.productSubType",
  },
  {
    key: "productType",
    name: "common.productType",
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

const ProductSubType = () => {
  const { t } = useTranslation();

  const props = useSelector((state) => state);
  const { navigation } = props;
  const { lang } = navigation;

  const [id, setId] = useState();
  const [data, setData] = useState([]);
  const [types, setTypes] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAllProductTypes();
    fetchAll();
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

  const fetchAll = async () => {
    setIsDataLoading(true);
    await instance
      .get(`products/subtype?page=${currentPage}`)
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

  const deleteData = () => {
    instance
      .delete(`products/subtype/${id}`)
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
    formik.setFieldValue("productType", d.productTypeId);
  };

  const handleDelete = (id) => {
    setId(id);
    setIsDialogOpen(true);
  };

  // formik
  const formik = useFormik({
    initialValues: {
      name: "",
      productType: "",
      date: new Date(),
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);

      instance
        .post("products/subtype", values)
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
                onChange={formik.handleChange}
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
                    className="bg-white border-b   hover:bg-red-50 "
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {d.name}
                    </th>

                    <td className="px-6 py-4">{d.productType}</td>
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

export default ProductSubType;
