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

// validation
const formSchema = Yup.object().shape({
  worker: Yup.number().required("please select worker name"),
  date: Yup.date().required("date of submission is required"),
});

// table header
const headers = [
  {
    key: "Worker",
    name: "worker name",
  },
  {
    key: "date",
    name: "date",
  },
  {
    key: "isPresent",
    name: "Avaibility",
  },
  {
    key: "startTime",
    name: "start time",
  },
  {
    key: "endTime",
    name: "end time",
  },
  {
    key: "actions",
    name: "actions",
  },
];

const WorkerAttendance = () => {
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
    console.log("🚀 ~ file: WorkerAttendance.jsx:101 ~ handleEdit ~ d:", d);
    formik.setFieldValue("id", d.id);
    formik.setFieldValue("worker", d.workerId);
    formik.setFieldValue("present", d.present);
    // formik.setFieldValue("startTime", d.startTime);
    // formik.setFieldValue("endTime", d.endTime);
  };

  const handleDelete = (id) => {
    setId(id);
    setIsDialogOpen(true);
  };

  // formik
  const formik = useFormik({
    initialValues: {
      worker: "",
      date: new Date(),
      present: "",
      startTime: new Date(),
      endTime: new Date(),
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
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
              <span className={`${styles.label}`}>Worker Name</span>
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

            {/* date */}
            <div>
              <span className={`${styles.label}`}>Date</span>
              <ReactDatePicker
                selected={formik.values.date}
                type="text"
                name="date"
                onChange={(date) => formik.setFieldValue("date", date)}
                onFocus={(e) => e.target.select()}
                className={`${styles.input}`}
                placeholder="Enter Details About Product"
              />
            </div>

            {/* Avaibility */}
            <div>
              <span className={`${styles.label}`}>Avaibility</span>
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
              <span className={`${styles.label}`}>Start Time</span>
              <ReactDatePicker
                selected={formik.values.startTime}
                onChange={(date) => formik.setFieldValue("startTime", date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className={`${styles.inputSelect}`}
              />
              {formik.errors.startTime ? (
                <div className={`${styles.error}`}>
                  {formik.errors.startTime}
                </div>
              ) : null}
            </div>

            {/* End Time */}
            <div>
              <span className={`${styles.label}`}>End Time</span>
              <ReactDatePicker
                selected={formik.values.endTime}
                onChange={(date) => formik.setFieldValue("endTime", date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className={`${styles.inputSelect}`}
              />
              {formik.errors.startTime ? (
                <div className={`${styles.error}`}>
                  {formik.errors.startTime}
                </div>
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
              {isLoading ? <ButtonSpinner /> : "Submit"}
            </button>
            {/* clear */}
            <button className={`${styles.buttonSecondary}`} type="reset">
              Clear
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
                      {header.name}
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
                      {d.worker}
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
