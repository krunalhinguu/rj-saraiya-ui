import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ReactDatePicker from "react-datepicker";
import * as Yup from "yup";
import { useFormik } from "formik";
import { instance } from "../../server";
import CustomDialoag from "../CustomDialoag";
import moment from "moment";
import { DATE_FORMAT, TIME_FORMAT } from "../../data/const";
import Spinner from "../Spinner";
import ButtonSpinner from "../ButtonSpinner";
import { useTranslation } from "react-i18next";

// validation
const formSchema = Yup.object().shape({
  worker: Yup.number().required("please select worker name"),
  date: Yup.date().required("date of submission is required"),
});

// table header
const headers = [
  {
    key: "Worker",
    name: "common.workerName",
  },
  {
    key: "date",
    name: "common.date",
  },
  {
    key: "isPresent",
    name: "common.availability",
  },
  {
    key: "startTime",
    name: "common.startTime",
  },
  {
    key: "endTime",
    name: "common.endTime",
  },
  {
    key: "actions",
    name: "",
  },
];

const WorkerAttendance = () => {
  const { t } = useTranslation();
  const [id, setId] = useState();
  const [data, setData] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    fetchAllWorkers();
    fetchAll();
  }, []);

  // handlers
  const fetchAll = async () => {
    setIsDataLoading(true);
    await instance
      .get("worker/attendance")
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

  const fetchAllWorkers = async () => {
    instance
      .get("worker")
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          setWorkers(data.body);
        }
      })
      .catch((error) => console.error(error));
  };

  const deleteData = () => {
    instance
      .delete(`worker/attendance/${id}`)
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
    formik.setFieldValue("worker", d.workerId);
    formik.setFieldValue("present", d.present);
    formik.setFieldValue("start", new Date(d.startTime));
    formik.setFieldValue("end", new Date(d.endTime));
  };

  const handleDelete = (id) => {
    setId(id);
    setIsDialogOpen(true);
  };

  // formik
  const formik = useFormik({
    initialValues: {
      worker: "",
      date: moment(),
      present: "",
      start: moment().toDate(),
      end: moment().toDate(),
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      values.startTime = values.start && values.start.toISOString();
      values.endTime = values.end && values.end.toISOString();

      // Calculate the difference in hours between the start and end times
      const startTime = moment(values.startTime);
      const endTime = moment(values.endTime);

      const totalHours = endTime.diff(startTime, "hours", true);

      values.totalHours = totalHours;

      setIsLoading(true);

      instance
        .post("worker/attendance", values)
        .then(({ data }) => {
          if (data.responseCode === "OK") {
            fetchAll();
            resetForm();
          }
          setIsLoading(false);
        })
        .catch((error) => {
          alert(error.response.data.errorMessage);
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
            {/* Worker Name */}
            <div>
              <span className={`${styles.label}`}>
                {t("common.workerName")}
              </span>
              <select
                id="worker"
                className={`${styles.inputSelect}`}
                value={formik.values.worker}
                onChange={formik.handleChange}
              >
                <option>Choose Worker</option>
                {workers.map((w, i) => (
                  <option key={i} value={w.id}>
                    {w.name}
                  </option>
                ))}
              </select>
              {formik.errors.worker ? (
                <div className={`${styles.error}`}>{formik.errors.worker}</div>
              ) : null}
            </div>

            {/* Avaibility */}
            <div>
              <span className={`${styles.label}`}>
                {t("common.availability")}
              </span>
              <select
                id="present"
                className={`${styles.inputSelect}`}
                value={formik.values.present}
                onChange={formik.handleChange}
              >
                <option>Choose option</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>

            {/* Start Time */}
            <div>
              <span className={`${styles.label}`}>{t("common.startTime")}</span>
              <ReactDatePicker
                showTimeSelect
                showTimeSelectOnly
                timeCaption="Time"
                dateFormat="h:mm aa"
                timeIntervals={30}
                selected={formik.values.start}
                onChange={(date) => formik.setFieldValue("start", date)}
                className={`${styles.inputSelect} py-2`}
              />
              {formik.errors.start ? (
                <div className={`${styles.error}`}>{formik.errors.start}</div>
              ) : null}
            </div>

            {/* End Time */}
            <div>
              <span className={`${styles.label}`}>{t("common.endTime")}</span>
              <ReactDatePicker
                showTimeSelect
                showTimeSelectOnly
                timeCaption="Time"
                dateFormat="h:mm aa"
                timeIntervals={30}
                selected={formik.values.end}
                onChange={(date) => formik.setFieldValue("end", date)}
                className={`${styles.inputSelect} py-2`}
              />
              {formik.errors.end ? (
                <div className={`${styles.error}`}>{formik.errors.end}</div>
              ) : null}
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
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-red-50 "
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {d.workerName}
                    </th>
                    <td className="px-6 py-4">
                      {moment(d.date).format(DATE_FORMAT)}
                    </td>
                    <td className="px-6 py-4">{d.present ? "Y" : "N"}</td>
                    <td className="px-6 py-4">
                      {moment(d.startTime).format(TIME_FORMAT)}
                    </td>
                    <td className="px-6 py-4">
                      {moment(d.endTime).format(TIME_FORMAT)}
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

export default WorkerAttendance;
