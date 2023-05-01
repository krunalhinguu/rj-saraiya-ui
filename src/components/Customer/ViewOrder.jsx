import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";
import styles from "../../styles/styles";
import { instance } from "../../server";
import ButtonSpinner from "../ButtonSpinner";
import Spinner from "../Spinner";
import { useTranslation } from "react-i18next";

// table header
const headers = [
  {
    key: "invoiceNo",
    name: "common.invoiceNo",
  },
  {
    key: "customerName",
    name: "common.customerName",
  },
  {
    key: "mobileNo",
    name: "common.mobileNo",
  },
  {
    key: "date",
    name: "common.date",
  },
  {
    key: "generatedBy",
    name: "common.generatedBy",
  },
  {
    key: "totalAmount",
    name: "common.totalAmount",
  },
];

const filters = [
  { id: "invoice", label: "common.invoiceNo" },
  { id: "mobile", label: "common.mobileNo" },
];

const ViewOrder = () => {
  const { t } = useTranslation();

  const [selectedFilterId, setSelectedFilterId] = useState("invoice");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  // handlers
  const fetchAll = async () => {
    setIsDataLoading(true);
    await instance
      .get("order/top100")
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

  const handleFilterClick = (filterId) => {
    setSelectedFilterId(filterId);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setIsDataLoading(true);
    await instance
      .get(`order/filter/${selectedFilterId}/${search}`)
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          setData(data.body);
        }
        setIsLoading(false);
        setIsDataLoading(false);
      })
      .catch((error) => {
        setData([]);
        setIsLoading(false);
        setIsDataLoading(false);
        console.error(error);
      });
  };

  return (
    <div>
      <div>
        <p className="my-2 font-bold text-sm text-slate-500">Search by</p>
      </div>

      {/* search bar */}
      <div className="flex justify-between gap-2 flex-wrap sm:flex-wrap sm:flex-grow-1">
        {/* filters */}
        <nav className="float-right">
          <ul class="inline-flex -space-x-px">
            {filters.map((filter) => (
              <li key={filter.id}>
                <button
                  key={filter.id}
                  className={`${
                    selectedFilterId === filter.id
                      ? "leading-tight text-[#e40414]  bg-white border border-gray-300"
                      : "leading-tight text-gray-500 bg-white border border-gray-300"
                  }  px-3 py-2 hover:bg-red-100 `}
                  onClick={() => handleFilterClick(filter.id)}
                >
                  {t(filter.label)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* search box */}
        <div className="flex gap-2">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            onFocus={(e) => e.target.select()}
            className={`${styles.input}`}
            placeholder={t("common.searchHere")}
          />
          <button
            disabled={isLoading}
            className={`${styles.buttonPrimary}`}
            onClick={handleSearch}
          >
            {t("common.search")}
          </button>
        </div>
      </div>

      {/* table */}
      {isDataLoading ? (
        <Spinner />
      ) : (
        <div className="relative overflow-x-auto sm:rounded-lg mt-5">
          {data && data.length > 0 ? (
            <table className="my-4 w-full text-sm text-left text-slate-500">
              <thead className="text-md uppercase bg-red-100 text-slate-500">
                <tr>
                  {headers.map((item, index) => (
                    <th key={item.key} scope="col" className="px-6 py-3">
                      {t(item.name)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.length > 0 &&
                  data.map((item, index) => (
                    <TableRow key={index} data={item} />
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center items-center">
              <span className="font-bold text-gray-400 text-lg">
                {t.noData}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewOrder;
