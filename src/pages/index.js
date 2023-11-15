import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/registrations",
        {
          name: formik.values.name,
          email: formik.values.email,
          address: formik.values.address,
        }
      );

      if (response.status === 200) {
        router.push("/data-registrations");
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "Registrations Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      address: Yup.string().required(),
    }),

    onSubmit: handleSubmit,
  });

  return (
    <main className="c h-screen bg-violet-200 flex justify-center items-center">
      <div className="b bg-white p-10 rounded-3xl w-1/3">
        <div className="flex flex-col justify-center items-center border-b border-gray-900/10 pb-3 mb-4">
          <h1 className="text-base font-semibold leading-7 text-gray-900">
            Registration
          </h1>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Make sure the data you fill in is correct
          </p>
        </div>
        <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
          <div className="sm:col-span-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Your Name <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                value={formik.values.name}
                onChange={formik.handleChange}
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-violet-300 sm:text-sm sm:leading-6"
              />
            </div>
            {formik.errors.name && (
              <p className="text-red-600 text-xs leading-6">
                {formik.errors.name}
              </p>
            )}
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-violet-300 sm:text-sm sm:leading-6"
              />
            </div>
            {formik.errors.email && (
              <p className="text-red-600 text-xs leading-6">
                {formik.errors.email}
              </p>
            )}
          </div>

          <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your Address <span className="text-red-600">*</span>
              </label>
              <div className="mt-2">
                <textarea
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  id="address"
                  name="address"
                  rows="3"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-violet-300 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
              {formik.errors.address && (
                <p className="text-red-600 text-xs leading-6">
                  {formik.errors.address}
                </p>
              )}
            </div>
          </div>
          <div className="mt-3">
            <button
              type="submit"
              className="rounded-md w-full bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
