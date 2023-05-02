import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import { DATE_FORMAT } from "../../data/const";
import moment from "moment";

const TableRow = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  function toggleExpand() {
    setExpanded(!expanded);
  }
  return (
    <>
      <tr
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-red-50 "
        onClick={toggleExpand}
      >
        <td className="px-6 py-4">{data.invoiceNo}</td>
        <td className="px-6 py-4">{data.customer.name}</td>
        <td className="px-6 py-4">{data.customer.mobileNo}</td>
        <td className="px-6 py-4">{moment(data.date).format(DATE_FORMAT)}</td>
        <td className="px-6 py-4">{data.generatedBy}</td>
        <td className="px-6 py-4 capitalize">{data.paidBy}</td>
        <td className="px-6 py-4">
          <NumericFormat
            value={data.totalAmount}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₹"}
          />
        </td>
      </tr>
      {expanded && (
        <>
          {data.items &&
            data.items.length > 0 &&
            data.items.map((item, i) => (
              <tr>
                <td className="px-6 py-2 capitalize" colSpan={1}>
                  {`${i + 1}. ${item.productName}`}
                </td>
                <td
                  className="px-6 py-2"
                  colSpan={1}
                >{`(₹${item.price} * ${item.quantity})`}</td>
                <td className="px-6 py-2" colSpan={2}>
                  <NumericFormat
                    value={item.price * item.quantity}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                  />
                </td>
              </tr>
            ))}
        </>
      )}
    </>
  );
};

export default TableRow;
