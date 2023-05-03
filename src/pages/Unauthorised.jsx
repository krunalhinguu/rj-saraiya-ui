import React from "react";
import { Link } from "react-router-dom";
import { IoMdLock } from "react-icons/io";

const Unauthorised = () => {
  return (
    <div className="w-full h-screen">
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <IoMdLock className="text-slate-500 mx-auto my-2" size={60} />

          <p className=" font-semibold text-slate-500 text-[40px] sm:text-md md:text-md">
            You are not authorised to access this page
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/customer"
              className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Unauthorised;
