import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    // Use EmailJS to send email
    emailjs
      .send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        {
          name: name,
          email: email,
          message: message,
          to_email: "rahulheer344@gmail.com", // Email to send feedback
        },
        "YOUR_USER_ID" // Replace with your EmailJS user ID
      )
      .then(
        (response) => {
          setStatus("Your message has been sent! Thank you for reaching out.");
          setFormData({ name: "", email: "", message: "" }); // Clear form
        },
        (error) => {
          setStatus("Oops! Something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="contact-us">
      <h1>Contact Us - CrowdFix</h1>
      <p>
        If you have any questions or feedback about the CrowdFix project, feel
        free to reach out to us. We'll get back to you as soon as possible!
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Send Message</button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
};

export default ContactUs;