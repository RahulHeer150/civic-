import { useState } from "react";
import React from 'react'
import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faMobile } from '@fortawesome/free-solid-svg-icons'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { faListOl } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

// import { RotatingLines } from "react-loader-spinner"; // Import the loader component
 const Register = () => {
  const [user, setUser] = useState({
    username: "",
    rollno: "",
    department: "B.Tech Computer Science Engineering",
    semester: "1",
    email: "",
    phone: "",
    password: "",
    otp: "",
    userId: "" 
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Display a loading spinner or some indication that the request is in progress
//     setLoading(true);
  
  // 

   };


export default Register