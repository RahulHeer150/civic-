import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import "./index.css";

import Home from "./pages/Home";
import How_it_works from "./pages/How_it_works";
import Explore from "./pages/Explore";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
//import ContactUs from "./pages/ContactUs";
import ForgotPassword from "./components/ForgetPassword";
import ResetPassword from "./components/Reset_password";
//import AuthPage from './pages/AuthPage'
import Register from "./pages/Register";
import Update_user from "./pages/Update_user";
import Navbar from "./components/Navbar";
import Hero1 from "./components/Hero1";
import OurMission from "./components/OurMission";
import Hero2 from "./components/Hero2";
import Footer from "./components/Footer";
import About from "./pages/About";
import Report_page from "./pages/Report_page";
import AuthPage from "./pages/AuthPage";
import Logout from "./components/Logout";
import MyActivity from "./components/MyActivity";
import UserDashBoard from "./components/UserDashBoard";
import IssueList from "./components/IssueList";
import Issue from "./components/Issue";
import AdminPage from "./pages/AdminPage";
import Aboutus from "./components/Aboutus";
import AdminExplore from "./pages/AdminExplore";
import AdminAnalytics from "./pages/AdminAnalytics";

const App=() => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/Register" element={<AuthPage />} />
        <Route path="/Authpage" element={<AuthPage />} />
        <Route path="/Login" element={<AuthPage />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/Update_user" element={<Update_user />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/userdashBoard" element={<UserDashBoard />} />
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report_page />} />
        <Route path="explore" element={<Explore />} />
        <Route path="/howitworks" element={<How_it_works />} />
        <Route path="/Error" element={<Error />} />
        <Route path="/home" element={<Home />} />
        <Route path="/activity" element={<MyActivity />} />
        <Route path="/all-issues" element={<IssueList />} />
        <Route path="/issues/:id" element={<Issue />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/forget-pass" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/About" element={<About />} />
        {/* <Route path="/contact" element={<ContactUs />} /> */}
        <Route path="/Register" element={<Register />} />
        //Admin Routes
        <Route path="/admin/issues" element={<AdminExplore />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

