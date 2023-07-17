import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../styles/styles";
import { instance } from "../server";
import { redirect, useNavigate } from "react-router-dom";
import ButtonSpinner from "./ButtonSpinner";

import { login } from "../redux/actions/UserSlice";
import { useDispatch } from "react-redux";
import { encryptStorage } from "../utils/secure-storage";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = Yup.object().shape({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      await instance
        .post("user/authenticate", values)
        .then(({ data }) => {
          // alert("Login Successful");
          if (data.responseCode === "OK") {
            const user = data.body;

            dispatch(login(user));
            navigate("/customer", { replace: true });

            alert("Welcome to Ramanlal J Saraiya");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          alert("Please Enter Valid Credentials");
          setIsLoading(false);
        });
    },
  });

  return (
    <div className="h-screen flex">
      {/* left */}
      <div
        className="hidden lg:flex w-full lg:w-1/2 login_img_section
          justify-around"
      >
        <div className="w-full mx-auto px-20 flex-col space-y-6 mt-[20vh]">
          {/* logo */}
          <img src="logo512.png" alt="logo" className="w-80 mx-auto" />
          {/* text */}
          <div className="w-max">
            <h1 className="font-Mukta animate-typing overflow-hidden p-3 break-all whitespace-nowrap border-r-4 border-r-[#e40414] pr-5 text-5xl text-[#e40414] font-bold">
              {t("title")}
            </h1>
          </div>
          <div className="w-full">
            <span className="text-lg break-all text-slate-400 font-semibold ">
              One of the oldest shop in the town (specialist in saffron
              haldi/केशर पीठी, Mataji Pujapa, Gugal dhoop, loban, fragrances,
              premium agarbatti), It’s our 4th generation serving the quality
              products of wedding rituals, Mataji Chundadi - Hawan products,
              Special Bridal (दुल्हन चुन्नी ओर महेन्दी कोन) chunni and 100%
              guaranteed Mahendi cone etc.
            </span>
          </div>
        </div>
      </div>
      {/* right */}
      <div className="flex flex-col mt-[20vh] mx-auto py-12 sm:px-6 lg:px-8mx-auto sm:mx-auto sm:w-full sm:max-w-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="flex justify-center items-center my-6 text-center text-2xl lg:text-center font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>
        <div className="bg-white rounded-md border-1 border-gray-900/10 p-10 shadow sm:rounder-lg sm:px-10">
          {/* form */}
          <form onSubmit={formik.handleSubmit}>
            {/* username */}
            <div className="pt-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onFocus={(e) => e.target.select()}
                  placeholder="Enter username"
                  className={`${styles.input}`}
                />
              </div>
            </div>
            {formik.errors.username ? (
              <div className="mt-2 text-sm text-red-400">
                {formik.errors.username}
              </div>
            ) : null}
            {/* password */}
            <div className="pt-8">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  name="password"
                  type={visible ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onFocus={(e) => e.target.select()}
                  placeholder="Enter password"
                  className={`${styles.input}`}
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
              {formik.errors.password ? (
                <div className="mt-2 text-sm text-red-400">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            {/* button: login */}
            <div>
              <button
                type="submit"
                className={`group relative ${styles.buttonPrimary} w-full mx-0 mt-10 leading-6`}
                disabled={isLoading}
              >
                {isLoading ? <ButtonSpinner /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
