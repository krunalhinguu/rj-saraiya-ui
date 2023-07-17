import moment, { months } from "moment";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import styles from "../../styles/styles";
import { instance } from "../../server";
import { useTranslation } from "react-i18next";

const localizer = momentLocalizer(moment);

const AttendanceReport = () => {
  const { t } = useTranslation();

  const [worker, setWorker] = useState("");
  const [workers, setWorkers] = useState([]);
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState(moment().startOf("month"));
  const [endDate, setEndDate] = useState(moment().endOf("month"));

  useEffect(() => {
    fetchReport();
    fetchAllWorkers();
  }, []);

  useEffect(() => {
    fetchReport();
  }, [startDate, endDate]);

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

  const fetchReport = async () => {
    const req = {
      startDate: startDate,
      endDate: endDate,
    };

    await instance
      .post("worker/attendance/report", req)
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          setEvents(data.body);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleWorkerChange = (e) => {
    const workerId = e.target.value;

    setWorker(workerId);

    const req = {
      startDate: startDate,
      endDate: endDate,
    };

    instance
      .post(`worker/attendance/report/${workerId}`, req)
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          setEvents(data.body);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function eventStyleGetter(event, start, end, isSelected) {
    const backgroundColor = event.present ? "green" : "red";
    const style = {
      backgroundColor,
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  }

  const handleNavigate = (date) => {
    const start = moment(date).startOf("month").toDate();
    const end = moment(date).endOf("month").toDate();

    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="container-fluid">
      <div className="mt-3 border p-3 rounded-md">
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          {/* worker name */}
          <div>
            <span className={`${styles.label}`}>{t("common.workerName")}</span>
            <select
              id="dealer"
              className={`${styles.inputSelect}`}
              value={worker}
              onChange={handleWorkerChange}
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
          </div>
        </div>

        <hr className="mt-3" />

        {/* calendar */}
        <div className="flex flex-col items-center justify-center h-[80%]">
          <div className="w-full h-[800px] mt-4">
            <Calendar
              events={events}
              startAccessor={(event) => new Date(event.start)}
              endAccessor={(event) => new Date(event.end)}
              localizer={localizer}
              onNavigate={handleNavigate}
              eventPropGetter={eventStyleGetter}
              // dayPropGetter={(date) => dayStyleGetter(date, events)}
              className="h-screen text-slate-600"
              popup
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;
