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

const CreateUser = () => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = Yup.object().shape({
    username: Yup.string().required("username is required"),
    name: Yup.string().required("name is required"),
    role: Yup.string().required("role is required"),
    password: Yup.string().required("password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      name: "",
      role: "",
      date: new Date(),
    },
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      await instance
        .post("user", values)
        .then(({ data }) => {
          if (data.responseCode === "OK") {
            console.log("heelo");
            alert("User created successfully");
            resetForm();
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
    <div className="flex">
      {/* right */}
      <div className="flex flex-col mt-[10vh] mx-auto py-12 sm:px-6 lg:px-8mx-auto sm:mx-auto sm:w-full sm:max-w-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="flex justify-center items-center my-6 text-center text-slate-500 text-2xl lg:text-center font-extrabold ">
            Create Website User
          </h2>
        </div>
        <div className="bg-white rounded-md border-1 border-gray-900/10 p-10 shadow sm:rounder-lg sm:px-10">
          {/* form */}
          <form onSubmit={formik.handleSubmit}>
            {/* name */}
            <div className="pt-5">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onFocus={(e) => e.target.select()}
                  placeholder="Enter username"
                  className={`${styles.input}`}
                />
              </div>
            </div>
            {formik.errors.name && formik.touched.name ? (
              <div className="mt-2 text-sm text-red-400">
                {formik.errors.name}
              </div>
            ) : null}

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
            {formik.errors.username && formik.touched.username ? (
              <div className="mt-2 text-sm text-red-400">
                {formik.errors.username}
              </div>
            ) : null}

            {/* password */}
            <div className="pt-5">
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
              {formik.errors.password && formik.touched.password ? (
                <div className="mt-2 text-sm text-red-400">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            {/* type */}
            <div className="pt-5">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User Role
              </label>
              <select
                name="role"
                className={`${styles.inputSelect}`}
                value={formik.values.role}
                onChange={formik.handleChange}
              >
                <option>choose user type</option>
                <option value="admin">admin</option>
                <option value="worker">worker</option>
              </select>
              {formik.errors.role && formik.touched.role ? (
                <div className="mt-2 text-sm text-red-400">
                  {formik.errors.role}
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
                {isLoading ? <ButtonSpinner /> : "Create User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
