import moment from "moment";
import React, { useEffect, useState } from "react";
import { DATE_FORMAT } from "../../data/const";
import { NumericFormat } from "react-number-format";
import { instance } from "../../server";

// table header
const headers = [
  {
    key: "expenseType",
    name: "expense type",
  },

  {
    key: "details",
    name: "details",
  },
  {
    key: "date",
    name: "date",
  },
  {
    key: "price",
    name: "price",
  },
];

const ExpenseReport = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  // handlers
  const fetchAll = async () => {
    setIsDataLoading(true);
    await instance
      .get("expense")
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

  const getTotalExpense = () => {
    const totalExpense =
      data && data.length > 0 && data.reduce((prev, d) => d.price + prev, 0);

    return totalExpense || 0;
  };

  return (
    <div>
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
                    {d.expenseType}
                  </th>

                  <td className="px-6 py-4">{d.details}</td>
                  <td className="px-6 py-4">
                    {moment(d.date).format(DATE_FORMAT)}
                  </td>
                  <td className="px-6 py-4">
                    <NumericFormat
                      value={d.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr class="font-semibold text-gray-900 dark:text-white">
              <th scope="row" class="px-6 py-3 text-base">
                Total
              </th>
              <td class="px-6 py-3"></td>
              <td class="px-6 py-3"></td>
              <td class="px-6 py-3">
                {
                  <NumericFormat
                    value={getTotalExpense()}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                  />
                }
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ExpenseReport;
