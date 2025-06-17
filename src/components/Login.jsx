import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import '../index.css';

function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Enter valid email address")
        .required("Email is required"),
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
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

        login({ token: data.token, userId: data.userId });

        setSubmitSuccess(true);
        setLoginError(null); // Clear previous errors if any
        resetForm();
      } catch (error) {
        console.error("Login error:", error);
        setLoginError("Invalid email or password. Please try again.");
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setSubmitSuccess(false), 3000);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-indigo-600">Charify</h1>
          <p className="text-sm text-gray-500 mt-2">Let's Make A Difference in Someone's Life Across Pakistan</p>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">Welcome Back</h2>
        <p className="text-sm text-gray-600 text-center mb-6">Login to your account to make a difference in your community</p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`mt-1 block w-full px-4 py-2 rounded-md border text-sm shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="your@email.com"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-600 mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`mt-1 block w-full px-4 py-2 rounded-md border text-sm shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="At least 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.956 9.956 0 012.204-6.268M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-600 mt-1">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition duration-300"
          >
            {isSubmitting ? (
              <span className="animate-spin h-5 w-5 mx-auto border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              "Login"
            )}
          </button>

          {submitSuccess && (
            <div className="text-green-600 text-sm text-center mt-2">✓ Login successful!</div>
          )}

          {loginError && (
            <div className="mt-4 bg-red-100 border border-red-300 text-red-700 text-sm rounded-md p-3 shadow">
              <p>{loginError}</p>
              <div className="text-right mt-2">
                <button
                  onClick={() => setLoginError(null)}
                  className="px-4 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition"
                >
                  OK
                </button>
              </div>
            </div>
          )}

          <p className="text-sm text-gray-500 text-center mt-4">
            Don't have an account? <Link to="/signup" className="text-indigo-600 hover:underline">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
