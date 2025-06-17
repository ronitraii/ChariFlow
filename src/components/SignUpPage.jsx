import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";

function Signup() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      email: yup.string().email("Enter valid email").required("Email is required"),
      password: yup.string().min(8, "Minimum 8 characters").required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitSuccess(true);
        resetForm();
      } catch (error) {
        console.error("Signup error:", error);
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setSubmitSuccess(false), 3000);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">Charify</h1>
          <p className="text-sm text-gray-600">Join us to make a difference across Pakistan</p>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Create your account</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={`w-full mt-1 p-2 border rounded-md ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Your full name"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`w-full mt-1 p-2 border rounded-md ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="you@example.com"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`w-full mt-1 p-2 border rounded-md ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="At least 8 characters"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-200"
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>

          {submitSuccess && (
            <p className="text-green-500 text-center text-sm mt-3">Signup successful!</p>
          )}
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
