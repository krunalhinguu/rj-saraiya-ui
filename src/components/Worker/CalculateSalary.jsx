import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { instance } from "../../server";
import { useTranslation } from "react-i18next";

import ButtonSpinner from "../ButtonSpinner";
import styles from "../../styles/styles";
import moment from "moment";
import * as Yup from "yup";

// validation
const formSchema = Yup.object().shape({
  worker: Yup.string().required("Required Field"),
});

const CalculateSalary = () => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [worker, setWorker] = useState("");
  const [workers, setWorkers] = useState([]);
  const [period, setPeriod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    fetchAllWorkers();
  }, []);

  // handlers

  const fetchAllWorkers = async () => {
    instance
      .get("worker/all")
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          setWorkers(data.body);
        }
      })
      .catch((error) => console.error(error));
  };

  const handlePeriodChange = (e) => {
    const value = e.target.value;

    let startDate, endDate;

    if (value === "current") {
      startDate = moment().startOf("month");
      endDate = moment().endOf("month");
    }

    if (value === "previous") {
      startDate = moment().subtract(1, "month").startOf("month");
      endDate = moment().subtract(1, "month").endOf("month");
    }

    formik.setFieldValue("startDate", startDate);
    formik.setFieldValue("endDate", endDate);
    setPeriod(value);
  };

  // formik
  const formik = useFormik({
    initialValues: {
      worker: "",
      startDate: "",
      endDate: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      instance
        .post("worker/salary", values)
        .then(({ data }) => {
          if (data.responseCode === "OK") {
            setData(data.body);
            resetForm();
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setData();
          setIsLoading(false);
          console.error(error);
        });
    },
  });

  return (
    <div className="container-fluid">
      <div className="mt-3 rounded-lg border p-3">
        {/* form */}
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            {/* worker name */}
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
                <option>Choose Worker Name</option>
                {workers &&
                  workers.length > 0 &&
                  workers.map((t, i) => (
                    <option key={i} value={t.id}>
                      {t.name}
                    </option>
                  ))}
              </select>
              {formik.errors.worker && formik.touched.worker ? (
                <div className={`${styles.error}`}>{formik.errors.worker}</div>
              ) : null}
            </div>

            {/* period */}
            <div>
              <span className={`${styles.label}`}>{t("common.period")}</span>
              <select
                id="period"
                className={`${styles.inputSelect}`}
                value={period}
                onChange={handlePeriodChange}
              >
                <option>Choose Month</option>
                <option value="previous">Previous Month</option>
                <option value="current">Current Month</option>
              </select>
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
              {isLoading ? <ButtonSpinner /> : t("common.calculateSalary")}
            </button>
            {/* clear */}
            <button className={`${styles.buttonSecondary}`} type="reset">
              {t("common.clear")}
            </button>
          </div>
        </form>
      </div>

      {data && (
        <div className="mt-3">
          <div className="border p-3 rounded-lg">
            <p className="text-lg font-bold">
              {t("common.attendedDays")}: {data.attendedDays}
            </p>
            <p className="text-lg font-bold">
              {t("common.dailyWage")}: {data.attendedDays}
            </p>
            <p className="text-lg font-bold">
              {t("common.totalHours")}: {data.totalHours}
            </p>
            <p className="text-lg font-bold">
              {t("common.total")}: {data.calculatedSalary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculateSalary;
