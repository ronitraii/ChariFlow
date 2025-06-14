import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import '../index.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [formData, setFormData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      Contact: "",
      Password: "",
      City: "",
    },    
    validationSchema: yup.object({
      Name: yup.string()
        .min(3, "Minimum length should be 3")
        .required("Name is required"),
      Email: yup.string()
        .email("Enter valid email address")
        .required("Email is required"),
      Contact: yup.string()
        .length(11, "Contact number should be 11 digits")
        .required("Contact number is required"),
      Password: yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      City: yup.string()
        .required("Please enter your city"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        // Prepare data for backend (note field name mapping)
        const userData = {
          name: values.Name,
          email: values.Email,
          phone: values.Contact,
          password: values.Password,
          city: values.City
        };

        const response = await fetch('http://localhost:3000/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Signup failed');
        }

        // Success handling
        setFormData([...formData, values]);
        resetForm();
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 3000);
        navigate('/Login'); // Redirect to login page after successful signup
      } catch (error) {
        // Error handling
        alert(error.message || 'An error occurred during signup');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="donation-signup-container">
      <div className="donation-signup-header">
        <div className="charify-logo">
          <h1>Charify</h1>
          <p className="tagline">Lets MAke A difference in someone life Across Pakistan</p>
        </div>
        <h2>Join Our Cause</h2>
        <p className="donation-subtitle">Create your account to make a difference in your community</p>
      </div>
      
      <form onSubmit={formik.handleSubmit} className="donation-signup-form">
        <div className="form-group">
          <label htmlFor="Name">Full Name</label>
          <input 
            type="text" 
            id="Name"
            name="Name" 
            onChange={formik.handleChange} 
            value={formik.values.Name} 
            onBlur={formik.handleBlur}
            className={formik.touched.Name && formik.errors.Name ? "error-input" : ""}
            placeholder="Enter your full name"
          />
          {formik.touched.Name && formik.errors.Name ? (
            <div className="error-message">
              <span className="error-icon">!</span> {formik.errors.Name}
            </div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="Email">Email Address</label>
          <input 
            type="email" 
            id="Email"
            name="Email" 
            onChange={formik.handleChange} 
            value={formik.values.Email} 
            onBlur={formik.handleBlur}
            className={formik.touched.Email && formik.errors.Email ? "error-input" : ""}
            placeholder="your@email.com"
          />
          {formik.touched.Email && formik.errors.Email ? (
            <div className="error-message">
              <span className="error-icon">!</span> {formik.errors.Email}
            </div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="Contact">Phone Number</label>
          <input 
            type="text" 
            id="Contact"
            name="Contact" 
            onChange={formik.handleChange} 
            value={formik.values.Contact} 
            onBlur={formik.handleBlur}
            className={formik.touched.Contact && formik.errors.Contact ? "error-input" : ""}
            placeholder="03XXXXXXXXX (11 digits)"
          />
          {formik.touched.Contact && formik.errors.Contact ? (
            <div className="error-message">
              <span className="error-icon">!</span> {formik.errors.Contact}
            </div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="Password">Create Password</label>
          <input 
            type="password" 
            id="Password"
            name="Password" 
            onChange={formik.handleChange} 
            value={formik.values.Password} 
            onBlur={formik.handleBlur}
            className={formik.touched.Password && formik.errors.Password ? "error-input" : ""}
            placeholder="At least 8 characters"
          />
          {formik.touched.Password && formik.errors.Password ? (
            <div className="error-message">
              <span className="error-icon">!</span> {formik.errors.Password}
            </div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="City">City</label>
          <input 
            type="text" 
            id="City"
            name="City" 
            onChange={formik.handleChange} 
            value={formik.values.City} 
            onBlur={formik.handleBlur}
            className={formik.touched.City && formik.errors.City ? "error-input" : ""}
            placeholder="Enter your city name"
          />
          {formik.touched.City && formik.errors.City ? (
            <div className="error-message">
              <span className="error-icon">!</span> {formik.errors.City}
            </div>
          ) : null}
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="spinner"></span>
          ) : (
            "Create Account & Join Charify"
          )}
        </button>

        {submitSuccess && (
          <div className="success-message">
            <span className="success-icon">✓</span> Thank you for joining Charify!
          </div>
        )}

        <p className="form-footer">
          Already have an account? <Link to="/Login" className="login-link">Log in</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpPage;