import moment from "moment";
import React from "react";
import { NumericFormat } from "react-number-format";
import styles from "../../styles/styles";
import ButtonSpinner from "../ButtonSpinner";

const ConfirmWindow = ({
  order,
  invoiceNo,
  handleSubmit,
  setIsActive,
  loading,
}) => {
  function getTotalAmount() {
    const { items } = order;

    const totalAmount = items.reduce((acc, item) => {
      if (item.quantity) return item.price * item.quantity + acc;
      else return item.price + acc;
    }, 0);

    return totalAmount;
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6 pb-2 tracking-wider uppercase">
          Invoice #{invoiceNo}
        </h2>
      </div>

      <div className="flex mb-8 justify-between">
        <div className="flex-1">
          {/* invoice no */}
          <div className="mb-2 md:mb-1 md:flex items-center">
            <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">
              Invoice No. :
            </label>

            <div className="flex-1">
              <div className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-48 py-2 text-gray-700 leading-tight">
                {invoiceNo}
              </div>
            </div>
          </div>

          {/* inovoice date */}
          <div className="mb-2 md:mb-1 md:flex items-center">
            <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">
              Invoice Date :
            </label>

            <div className="flex-1">
              <div className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-48 py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 js-datepicker">
                {moment(order.date).format("DD/MM/YYYY")}
              </div>
            </div>
          </div>

          {/* biller */}
          <div className="mb-2 md:mb-1 md:flex items-center">
            <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">
              Biller Name :
            </label>

            <div className="flex-1">
              <div className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-48 py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 js-datepicker-2">
                {order.generatedBy}
              </div>
            </div>
          </div>
        </div>

        <div className="float-end">
          <div className="mb-2 md:mb-1 md:flex items-center">
            {/* customer name */}
            <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">
              Customer Name :
            </label>

            <div className="flex-1">
              <div className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-48 py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 js-datepicker-2">
                {order.customer.name}
              </div>
            </div>
          </div>

          {/* mobile no */}
          <div className="mb-2 md:mb-1 md:flex items-center">
            <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">
              Mobile Number :
            </label>

            <div className="flex-1">
              <div className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-48 py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 js-datepicker-2">
                {order.customer.mobileNo}
              </div>
            </div>
          </div>

          {/* paid by */}
          <div className="mb-2 md:mb-1 md:flex items-center">
            <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">
              Paid By :
            </label>

            <div className="flex-1">
              <div className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-48 py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 js-datepicker-2">
                {order.paidBy}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="flex -mx-1 border-b py-2 items-start">
        <div className="flex-1 px-1">
          <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">
            Product Name
          </p>
        </div>

        <div className="px-1 w-20 text-right">
          <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">
            Units
          </p>
        </div>

        <div className="px-1 w-32 text-right">
          <p className="leading-none">
            <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">
              Per Unit Price
            </span>
            {/* <span className="font-medium text-xs text-gray-500">(Incl. GST)</span> */}
          </p>
        </div>

        <div className="px-1 w-32 text-right">
          <p className="leading-none">
            <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">
              Amount
            </span>
            {/* <span className="font-medium text-xs text-gray-500">(Incl. GST)</span> */}
          </p>
        </div>
      </div>

      <div>
        {order.items.map((item, index) => (
          <div className="flex -mx-1 py-2 border-b" key={index}>
            <div className="flex-1 px-1">
              <div className="flex gap-2 items-center">
                <p className="text-gray-800">{item.productName}</p>
                <p className="text-gray-500 text-sm font-semibold">
                  {item.size ? `(${item.size})` : null}
                </p>
              </div>
            </div>

            <div className="px-1 w-20 text-right">
              <p className="text-gray-800">
                {item.quantity ? item.quantity : "1"}
              </p>
            </div>

            <div className="px-1 w-32 text-right">
              <p className="text-gray-800">{item.price}</p>
            </div>

            <div className="px-1 w-32 text-right">
              <p className="text-gray-800">
                {item.quantity ? item.quantity * item.price : item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
      {order.whatsapp && (
        <p className=" mt-4 italic">
          Note: This invoice will be send on whatsapp number
        </p>
      )}
      <div className="py-2 ml-auto mt-5 w-full sm:w-2/4 lg:w-1/4">
        <div className="py-2 border-t border-b">
          <div className="flex justify-between">
            <div className="text-xl text-gray-600 text-right flex-1">
              Amount
            </div>
            <div className="text-right w-40">
              <div className="text-xl text-gray-800 font-bold">
                <NumericFormat
                  value={getTotalAmount()}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 mb-2">
        {/* save */}
        <button
          className={`${styles.buttonPrimary}`}
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <ButtonSpinner /> : "Confirm & Place Order"}
        </button>
        {/* clear */}
        <button
          className={`${styles.buttonSecondary}`}
          type="reset"
          onClick={() => setIsActive(true)}
        >
          {/* {t("common.clear")} */} Go Back
        </button>
      </div>
    </div>
  );
};

export default ConfirmWindow;
