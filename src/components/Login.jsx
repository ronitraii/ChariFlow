import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import '../index.css';
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
      setErrorMessage(""); // Clear previous errors
      
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

        // Store the token (you might want to use more secure storage in production)
        login({ token: data.token });
        
        setSubmitSuccess(true);
        resetForm();
        
        navigate('/home') 
        
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
    <div className="donation-signup-container">
      <div className="donation-signup-header">
        <div className="charify-logo">
          <h1>Charify</h1>
          <p className="tagline">Let's Make A Difference in Someone's Life Across Pakistan</p>
        </div>
        <h2>Welcome Back</h2>
        <p className="donation-subtitle">Login to your account to make a difference in your community</p>
      </div>
      
      <form onSubmit={formik.handleSubmit} className="donation-signup-form">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={formik.touched.email && formik.errors.email ? "error-input" : ""}
            placeholder="your@email.com"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error-message">
              <span className="error-icon">!</span> {formik.errors.email}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password"
            name="password" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={formik.touched.password && formik.errors.password ? "error-input" : ""}
            placeholder="At least 8 characters"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error-message">
              <span className="error-icon">!</span> {formik.errors.password}
            </div>
          )}
        </div>

        {errorMessage && (
          <div className="error-message">
            <span className="error-icon">!</span> {errorMessage}
          </div>
        )}

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="spinner"></span>
          ) : (
            "Login"
          )}
        </button>

        {submitSuccess && (
          <div className="success-message">
            <span className="success-icon">✓</span> Login successful!
          </div>
        )}

        <p className="form-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;