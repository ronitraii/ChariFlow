import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string()
        .email("Enter valid email address")
        .required("Email is required"),
      password: yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      setErrorMessage("");

      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }

        login({ token: data.token });
        setSubmitSuccess(true);
        resetForm();
        navigate('/home');

      } catch (error) {
        console.error("Login error:", error);
        setErrorMessage(error.message || 'Invalid email or password');
      } finally {
        setIsSubmitting(false);
        setTimeout(() => {
          setSubmitSuccess(false);
          setErrorMessage("");
        }, 3000);
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 py-10">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">Charify</h1>
          <p className="text-sm text-gray-500 mt-1">
            Let's Make A Difference in Someone's Life Across Pakistan
          </p>
          <h2 className="text-xl font-semibold mt-6">Welcome Back</h2>
          <p className="text-gray-600 text-sm">Login to your account to make a difference in your community</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="your@email.com"
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="At least 8 characters"
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                formik.touched.password && formik.errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-600 mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm">
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          {/* Success Message */}
          {submitSuccess && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm">
              ✓ Login successful!
            </div>
          )}

          {/* Footer */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
