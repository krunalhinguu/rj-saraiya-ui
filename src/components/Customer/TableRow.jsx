import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import { DATE_FORMAT } from "../../data/const";
import moment from "moment";
import CustomDialoag from "../CustomDialoag";
import instance from "../../server";
import { useDispatch } from "react-redux";
import {
  setCurrentCustomerTab,
  setOrder,
} from "../../redux/actions/CommonSlice";

const TableRow = ({ data, fetchAll }) => {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [expanded, setExpanded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function toggleExpand() {
    setExpanded(!expanded);
  }

  const handleDelete = (id) => {
    setId(id);
    setIsDialogOpen(true);
  };

  const handleEdit = (data) => {
    dispatch(setOrder({ order: data }));
  };

  const deleteData = () => {
    instance
      .delete(`order/${id}`)
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          fetchAll();
          setIsDialogOpen(false);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <tr className="bg-white border-b   hover:bg-red-50 ">
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
        <td className="flex items-center px-6 py-4 space-x-3">
          <button
            className="font-medium text-slate-600  hover:underline"
            onClick={toggleExpand}
          >
            View
          </button>
          <button
            className="font-medium text-blue-600  hover:underline"
            onClick={() => handleEdit(data)}
          >
            Edit
          </button>
          <button
            className="font-medium text-red-600  hover:underline"
            onClick={() => handleDelete(data.invoiceNo)}
          >
            Remove
          </button>
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
    </>
  );
};

export default TableRow;
