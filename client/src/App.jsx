import { BrowserRouter , Route , Routes } from 'react-router-dom'
import React from 'react'
import './index.css'

import Home from './pages/Home'
import UserProfile from './pages/UserProfile'
import Login from './pages/Login'
import ForgotPassword from './components/ForgetPassword'
import ResetPassword from './components/Reset_password'
//import AuthPage from './pages/AuthPage'
import Register from './pages/Register'
import Update_user from './pages/Update_user'
import Navbar from './components/Navbar'
import Hero1 from './components/Hero1'
import ReportForm from './components/ReportForm'
import Report_Header from './components/Report_Header'
import OurMission from './components/OurMission'
import Hero2 from './components/Hero2'
//import AuthPage from './pages/AuthPage'

function App() {


  return (
      <>
      <Hero2/>
      
      </>
  
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/Register' element={<Register/>}/>
    //     <Route path='/Login' element={<Login/>}/>
    //     {/* <Route path='/Logout' element={<Logout/>}/> */}
    //     <Route path='/Update_user' element={<Update_user/>}/>
    //     <Route path='/Userprofile' element={<UserProfile/>}/>
    //     <Route path='/' element={<Home/>}/>
    //     <Route path='/ForgetPassword' element={<ForgotPassword/>}/>
    //     <Route path='/ResetPassword/:token' element={<ResetPassword/>}/>
    //     <Route path='/Register' element={<Register/>}/>
    //     <Route path='/Register' element={<Register/>}/>

    //   </Routes>
    // </BrowserRouter>
  )
}

export default App
