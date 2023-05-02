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
    key: "paidBy",
    name: "common.paidBy",
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
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAll();
  }, [currentPage]);

  useEffect(() => {
    if (!search) {
      fetchAll();
    }
  }, [search]);

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
      .get(`order?page=${currentPage}`)
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
          <ul className="inline-flex -space-x-px">
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
            <div>
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

              {/* pagination */}
              <div className="flex justify-end gap-1 m-3">
                <button
                  disabled={currentPage === 0}
                  onClick={handlePrevious}
                  className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-red-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-red-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
