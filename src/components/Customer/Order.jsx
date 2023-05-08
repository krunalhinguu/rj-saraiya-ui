import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReactTransliterate } from "react-transliterate";
import { instance } from "../../server";
import { useFormik } from "formik";
import { NumericFormat } from "react-number-format";
import { MdSearch } from "react-icons/md";

import ReactDatePicker from "react-datepicker";
import ButtonSpinner from "../ButtonSpinner";

import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup";
import ConfirmWindow from "./ConfirmWindow";
import { clearOrder } from "../../redux/actions/CommonSlice";
import { date } from "../../utils/common";

const formSchema = Yup.object().shape({
  customer: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    mobileNo: Yup.string()
      .required("Mobile no is required")
      .matches(/^[0-9]{10}$/, "Invalid mobile no"),
  }),
  paidBy: Yup.string().required("Required field"),
});

const Order = () => {
  const dispatch = useDispatch();
  const props = useSelector((state) => state);
  const { user, navigation, common } = props;
  const { lang } = navigation;

  const { t } = useTranslation();

  const [types, setTypes] = useState([]);
  const [subTypes, setSubTypes] = useState([]);
  const [products, setProducts] = useState([]);
  const [productType, setProductType] = useState(0);
  const [productSubType, setProductSubType] = useState(0);
  const [frequentlyBought, setFrequentlyBought] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetchAllProductTypes();
    fetchAllPriorityProducts();
    fetchInvoiceNo();
  }, []);

  useEffect(() => {
    const { order } = common;
    console.log("🚀 ~ file: Order.jsx:56 ~ useEffect ~ order:", order);

    if (order) {
      // setInvoiceNo(order.invoiceNo);
      formik.setFieldValue("invoiceNo", order.invoiceNo);
      formik.setFieldValue("customer.name", order.customer.name);
      formik.setFieldValue("customer.mobileNo", order.customer.mobileNo);
      formik.setFieldValue("paidBy", order.paidBy);
      formik.setFieldValue("whatsapp", order.whatsapp);
      setSelectedOptions(order.items);
      // formik.setFieldValue("customer.mobileNo", order.customer.mobileNo);
    }
  }, []);

  const handleSelectOption = (optionValue) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(optionValue)
        ? prevSelected.filter((value) => value !== optionValue)
        : [...prevSelected, optionValue],
    );
  };

  const handleItemDelete = (id) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.filter((value, i) => value.productId !== id),
    );
  };

  const handleQuatityChange = (index, quantity) => {
    setSelectedOptions((prevValues) => {
      const newValues = [...prevValues];
      const updatedOption = {
        ...newValues[index],
        quantity: quantity,
        totalAmount: quantity ? quantity * newValues[index].price : 0,
      };
      newValues[index] = updatedOption;
      return newValues;
    });
  };

  const handlePriceChange = (index, price) => {
    setSelectedOptions((prevValues) => {
      const newValues = [...prevValues];
      const updatedOption = {
        ...newValues[index],
        price: price,
        totalAmount: price * newValues[index].quantity,
      };

      newValues[index] = updatedOption;
      return newValues;
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    instance
      .post("order", formik.values)
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          formik.resetForm();
          fetchInvoiceNo();

          setTypes([]);
          setSubTypes([]);
          setProducts([]);
          setSelectedOptions([]);
          setIsActive(true);
          setIsOpen(false);

          dispatch(clearOrder());

          alert("Order placed successfully");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        alert("Order Failed");
        setIsLoading(false);
        console.error(error);
      });
  };

  const handleSearchChange = (text) => {
    setIsOpen(true);
    setSearchQuery(text);
  };

  const handleToggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const filteredOptions =
    products &&
    products.length > 0 &&
    products.filter(
      (option) =>
        option &&
        option.productName
          .toLowerCase()
          .includes(searchQuery && searchQuery.toLowerCase()),
    );

  const fetchAllProductTypes = async () => {
    instance
      .get("products/type/all")
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          setTypes(data.body);
        }
      })
      .catch((error) => console.error(error));
  };

  const fetchInvoiceNo = async () => {
    instance
      .get("order/invoice")
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          setInvoiceNo(data.body);
        }
      })
      .catch((error) => console.error(error));
  };

  const fetchAllPriorityProducts = async () => {
    instance
      .get("products/frequently")
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          setFrequentlyBought(data.body);
        }
      })
      .catch((error) => console.error(error));
  };

  const fetchAllProductSubTypesByProductType = async (id) => {
    instance
      .get(`products/type/${id}/subtype`)
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          setSubTypes(data.body);
        }
      })
      .catch((error) => console.error(error));
  };

  const getTotalBillAmount = () => {
    const totalExpense =
      selectedOptions &&
      selectedOptions.length > 0 &&
      selectedOptions.reduce((prev, d) => d.totalAmount + prev, 0);

    return totalExpense || 0;
  };

  const fetchAllProducts = async (subtypeId) => {
    instance
      .get(`products/type/${productType}/subtype/${subtypeId}`)
      .then(({ data }) => {
        if (data.responseCode === "OK") {
          setProducts(data.body);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleProductTypeChange = (e) => {
    const value = e.target.value;

    setProductType(value);
    fetchAllProductSubTypesByProductType(value);
  };

  const handleProductSubTypeChange = async (e) => {
    const value = e.target.value;

    setProductSubType(value);
    fetchAllProducts(value);
  };

  // formik
  const formik = useFormik({
    initialValues: {
      date: date,
      whatsapp: false,
      paidBy: "",
      generatedBy: user.data.name,
      customer: {
        name: "",
        mobileNo: "",
      },
      items: [],
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      if (selectedOptions.length === 0) {
        alert("Choose atleast one product");
        return;
      }

      values.items = selectedOptions;

      setIsActive(false);
    },
  });
  return (
    <div className="container-fluid">
      {/* bill No */}
      {isActive ? (
        <div>
          <div className="flex flex-row-reverse gap-2">
            <p className="text-md font-bold text-slate-600">
              {t("common.invoiceNo")} : {invoiceNo}
            </p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            {/* customer info */}
            <fieldset className="rounded-md border border-slate-300 p-3">
              {/* legend */}
              <legend className="text-sm"> {t("common.customer")}</legend>

              <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                {/* name */}
                <div>
                  <span className={`${styles.label}`}>
                    {t("common.customerName")}
                  </span>
                  <ReactTransliterate
                    value={formik.values.customer.name}
                    onChangeText={(text) => {
                      formik.setFieldValue("customer.name", text);
                    }}
                    className={`${styles.input}`}
                    onFocus={(e) => e.target.select()}
                    lang={lang}
                    enabled={lang === "gu"}
                  />
                  {formik.errors.customer && formik.touched.customer ? (
                    <div className={`${styles.error}`}>
                      {formik.errors.customer.name}
                    </div>
                  ) : null}
                </div>

                {/* mobile no */}
                <div>
                  <span className={`${styles.label}`}>
                    {t("common.mobileNo")}
                  </span>
                  <input
                    type="number"
                    name="customer.mobileNo"
                    value={formik.values.customer.mobileNo}
                    onChange={formik.handleChange}
                    onFocus={(e) => e.target.select()}
                    className={`${styles.input}`}
                  />
                  {formik.errors.customer && formik.touched.customer ? (
                    <div className={`${styles.error}`}>
                      {formik.errors.customer.mobileNo}
                    </div>
                  ) : null}
                </div>

                {/* paid by */}
                <div>
                  <span className={`${styles.label}`}>
                    {t("common.paidBy")}
                  </span>
                  <select
                    name="paidBy"
                    className={`${styles.inputSelect}`}
                    value={formik.values.paidBy}
                    onChange={formik.handleChange}
                  >
                    <option>choose payment type</option>
                    <option>Cash</option>
                    <option>UPI</option>
                    <option>Bank</option>
                    <option>Card</option>
                  </select>
                  {formik.errors.paidBy && formik.touched.paidBy ? (
                    <div className={`${styles.error}`}>
                      {formik.errors.paidBy}
                    </div>
                  ) : null}
                </div>
                {/* date */}
                <div>
                  <span className={`${styles.label}`}>{t("common.date")}</span>
                  <ReactDatePicker
                    disabled
                    type="text"
                    name="date"
                    dateFormat="dd/MM/yyyy"
                    selected={formik.values.date}
                    onFocus={(e) => e.target.select()}
                    className={`${styles.input}`}
                  />
                </div>
              </div>

              {/* whatsapp  */}
              <div className="flex items-center mx-2 mt-4 mb-2">
                <input
                  name="whatsapp"
                  id="whatsapp"
                  type="checkbox"
                  className="w-4 h-4"
                  checked={formik.values.whatsapp}
                  value={formik.values.whatsapp}
                  onChange={formik.handleChange}
                />
                <label
                  htmlFor="whatsapp"
                  className="ml-2 text-sm text-slate-500 font-bold"
                >
                  whatsapp number?
                </label>
              </div>
            </fieldset>
            <fieldset className="rounded-md border border-slate-300 p-3 mt-2">
              <legend className="text-sm">{t("common.items")}</legend>

              <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                {/* product type */}
                <div>
                  <span className={`${styles.label}`}>
                    {t("common.productType")}
                  </span>
                  <select
                    id="productType"
                    className={`${styles.inputSelect}`}
                    value={productType}
                    onChange={handleProductTypeChange}
                  >
                    <option>{t("common.chooseProductType")}</option>
                    {types.map((t, i) => (
                      <option key={i} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* product sub type */}
                <div>
                  <span className={`${styles.label}`}>
                    {t("common.productSubType")}
                  </span>
                  <select
                    id="productSubType"
                    className={`${styles.inputSelect}`}
                    value={productSubType}
                    onChange={handleProductSubTypeChange}
                  >
                    <option>{t("common.chooseProductSubType")}</option>
                    {subTypes.map((t, i) => (
                      <option key={i} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* products */}
                <div>
                  <span className={`${styles.label}`}>
                    {t("common.productName")}
                  </span>
                  <div
                    className={`${styles.inputSelect} py-2 flex gap-1`}
                    onClick={handleToggleDropdown}
                  >
                    <MdSearch size={20} />
                    <ReactTransliterate
                      placeholder={t("common.searchProducts")}
                      className="w-full text-gray-700 bg-transparent border-none outline-none"
                      value={searchQuery}
                      onChangeText={(text) => handleSearchChange(text)}
                      onFocus={(e) => e.target.select()}
                      lang={lang}
                      enabled={lang === "gu"}
                    />
                  </div>

                  {isOpen && (
                    <div className="max-h-48 overflow-y-auto py-2 mt-1 bg-white border border-gray-300 rounded-md">
                      {filteredOptions && filteredOptions.length > 0 ? (
                        filteredOptions.map(
                          (option) =>
                            !option.pinned && (
                              <div
                                key={option.productId}
                                className="flex items-center py-1 pl-2"
                              >
                                <input
                                  type="checkbox"
                                  id={option.productId}
                                  checked={selectedOptions.includes(option)}
                                  onChange={() => handleSelectOption(option)}
                                  className="w-4 h-4 mx-2"
                                />
                                <label
                                  htmlFor={option.productId}
                                  className="py-2 ml-2 text-sm font-medium text-gray-900 rounded capitalize"
                                >
                                  {option.productName}
                                  {option.size && (
                                    <span className="ml-2 text-xs text-gray-400">
                                      size: {option.size}
                                    </span>
                                  )}
                                  <span className="mx-1 text-xs text-gray-400">
                                    {`(₹${option.price}/${option.typeOfQuantity})`}
                                  </span>
                                </label>
                              </div>
                            ),
                        )
                      ) : (
                        <div className="mx-5 my-2 text-sm font-bold text-slate-500">
                          {t("common.noData")}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-2 grid gap-2 lg:grid-cols-8 md:grid-cols-4 sm:grid-cols-2">
                {frequentlyBought &&
                  frequentlyBought.length > 0 &&
                  frequentlyBought.map((item, i) => (
                    <div
                      key={item.productId}
                      className="flex items-center py-1 pl-2"
                    >
                      <input
                        type="checkbox"
                        id={item.productId}
                        checked={selectedOptions.includes(item)}
                        onChange={() => handleSelectOption(item)}
                        className="w-4 h-4 mx-2"
                      />
                      <label
                        htmlFor={item.productId}
                        className="py-2 ml-2 text-sm font-medium text-gray-900 rounded capitalize"
                      >
                        {item.productName}
                        <span className="mx-1 text-xs text-gray-400">
                          {`(₹${item.price}/${item.typeOfQuantity})`}
                        </span>
                      </label>
                    </div>
                  ))}
              </div>
            </fieldset>
            {/* bill table */}
            {selectedOptions.length > 0 ? (
              <div className="relative overflow-x-auto sm:rounded-lg mt-5">
                <table className="my-4 w-full text-sm text-left text-slate-500">
                  <thead className="text-md uppercase bg-red-100 text-slate-500">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        {t("common.productName")}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t("common.pricePerKgOrPc")}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t("common.quantity")}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t("common.totalAmount")}
                      </th>
                      <th scope="col" className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOptions.map((item, i) => (
                      <tr
                        key={item.productId}
                        className="bg-white border-b hover:bg-red-50 "
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {item.size
                            ? `${item.productName} (${item.size})`
                            : item.productName}
                        </th>

                        <td className="px-6 py-3">
                          <input
                            type="number"
                            name="price"
                            value={item.price}
                            onFocus={(e) => e.target.select()}
                            className="bg-transparent"
                            placeholder="Enter Price"
                            onChange={(e) =>
                              handlePriceChange(i, e.target.value)
                            }
                          />
                        </td>
                        <td className="px-6 py-3">
                          <input
                            type="number"
                            name="quantity"
                            onFocus={(e) => e.target.select()}
                            className="bg-transparent"
                            value={item.quantity && item.quantity}
                            placeholder="1"
                            onChange={(e) =>
                              handleQuatityChange(i, e.target.value)
                            }
                          />
                        </td>
                        <td className="px-6 py-3">
                          <NumericFormat
                            value={
                              item.quantity
                                ? item.price * item.quantity
                                : item.price
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₹"}
                          />
                        </td>
                        <td className="flex items-center px-6 py-4 space-x-3">
                          <button
                            className="font-medium text-red-600  hover:underline"
                            onClick={() => handleItemDelete(item.productId)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-semibold text-gray-900 ">
                      <th scope="row" className="px-6 py-3 text-base">
                        {t("common.total")}
                      </th>
                      <td></td>
                      <td></td>
                      <td className="px-6 py-3">
                        <NumericFormat
                          value={getTotalBillAmount()}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₹"}
                        />
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : null}
            {/* buttons */}
            <div className="mt-4 mb-2">
              {/* save */}
              <button
                className={`${styles.buttonPrimary}`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <ButtonSpinner /> : "Next"}
              </button>
              {/* clear */}
              <button className={`${styles.buttonSecondary}`} type="reset">
                {t("common.clear")}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <ConfirmWindow
          order={formik.values}
          invoiceNo={invoiceNo}
          handleSubmit={handleSubmit}
          setIsActive={setIsActive}
          loading={isLoading}
        />
      )}
    </div>
  );
};

export default Order;
