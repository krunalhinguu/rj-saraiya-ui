import React, { useEffect, useState } from "react";
import { ReactTransliterate } from "react-transliterate";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { instance } from "../../server";
import { useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";
import { DATE_FORMAT } from "../../data/const";

import * as Yup from "yup";
import moment from "moment";
import ReactDatePicker from "react-datepicker";

import CustomDialoag from "../CustomDialoag";
import ButtonSpinner from "../ButtonSpinner";
import Spinner from "../Spinner";

import styles from "../../styles/styles";

// validation
const formSchema = Yup.object().shape({
  name: Yup.string().required("product type is required"),
  date: Yup.date().required("date is required"),
});

// table header
const headers = [
  {
    key: "name",
    name: "common.name",
  },
  {
    key: "address",
    name: "common.address",
  },
  {
    key: "phone",
    name: "common.mobileNo",
  },
  {
    key: "type",
    name: "common.workerType",
  },
  {
    key: "details",
    name: "common.details",
  },
  {
    key: "dailyWage",
    name: "common.dailyWage",
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

const WorkerInfo = () => {
  const props = useSelector((state) => state);

  const { navigation } = props;
  const { lang } = navigation;

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
      .get("worker")
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
      .delete(`worker/${id}`)
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
    formik.setFieldValue("name", d.name);
    formik.setFieldValue("address", d.address);
    formik.setFieldValue("phone", d.phone);
    formik.setFieldValue("type", d.type);
    formik.setFieldValue("details", d.details);
  };

  const handleDelete = (id) => {
    setId(id);
    setIsDialogOpen(true);
  };

  // formik
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      type: "",
      details: "",
      dailyWage: "",
      date: new Date(),
    },
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      instance
        .post("worker", values)
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
            {/* name */}
            <div>
              <span className={`${styles.label}`}>{t("common.name")}</span>
              <ReactTransliterate
                value={formik.values.name}
                onChangeText={(text) => formik.setFieldValue("name", text)}
                className={`${styles.input}`}
                onFocus={(e) => e.target.select()}
                lang={lang}
                enabled={lang === "gu"}
              />
              {formik.errors.name ? (
                <div className={`${styles.error}`}>{formik.errors.name}</div>
              ) : null}
            </div>

            {/* address */}
            <div>
              <span className={`${styles.label}`}>{t("common.address")}</span>
              <ReactTransliterate
                value={formik.values.address}
                onChangeText={(text) => formik.setFieldValue("address", text)}
                className={`${styles.input}`}
                onFocus={(e) => e.target.select()}
                lang={lang}
                enabled={lang === "gu"}
              />
            </div>

            {/* phone number */}
            <div>
              <span className={`${styles.label}`}>{t("common.mobileNo")}</span>
              <input
                type="number"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.select()}
                className={`${styles.input}`}
              />
            </div>

            {/* worker type */}
            <div>
              <span className={`${styles.label}`}>
                {t("common.workerType")}
              </span>
              <ReactTransliterate
                value={formik.values.type}
                onChangeText={(text) => {
                  formik.setFieldValue("type", text);
                }}
                className={`${styles.input}`}
                onFocus={(e) => e.target.select()}
                lang={lang}
                enabled={lang === "gu"}
              />
            </div>

            {/* daily wage */}
            <div>
              <span className={`${styles.label}`}>{t("common.dailyWage")}</span>
              <input
                type="number"
                name="dailyWage"
                value={formik.values.dailyWage}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.select()}
                className={`${styles.input}`}
                placeholder="₹"
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
                      {d.name}
                    </th>

                    <td className="px-6 py-4">{d.address}</td>
                    <td className="px-6 py-4">{`+91-${d.phone}`}</td>
                    <td className="px-6 py-4">{d.type}</td>
                    <td className="px-6 py-4">{d.details}</td>
                    <td className="px-6 py-4">
                      <NumericFormat
                        value={d.dailyWage}
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

export default WorkerInfo;
