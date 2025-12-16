import React from 'react'
import { useEffect } from "react";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const Logout = () => {
  const { logoutUser } = useAuth(); // Use 'logoutUser' instead of 'LogoutUser'
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("Logout Succesfully");
    logoutUser();
    navigate("/")
  }, [logoutUser]);

  return(
    <>
    <Navigate to="/" />
    </>
  )
};

export default Logout;
