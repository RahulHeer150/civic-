import { BrowserRouter , Route , Routes } from 'react-router-dom'
import React from 'react'
import './index.css'

import Home from './pages/Home'
import How_it_works from './pages/How_it_works'
import Explore from './pages/Explore'
import UserProfile from './pages/UserProfile'
import Login from './pages/Login'
import ForgotPassword from './components/ForgetPassword'
import ResetPassword from './components/Reset_password'
//import AuthPage from './pages/AuthPage'
import Register from './pages/Register'
import Update_user from './pages/Update_user'
import Navbar from './components/Navbar'
import Hero1 from './components/Hero1'
import OurMission from './components/OurMission'
import Hero2 from './components/Hero2'
import Footer from './components/Footer'
import About from './pages/About'
import AuthPage from './pages/AuthPage'
import Logout from './components/Logout'
import Contact from './pages/Contact'

function App() {


  return (
      
  
    <BrowserRouter>
        <Navbar/>
      <Routes>
        <Route path='/Register' element={<Register/>}/>
         <Route path='/Authpage' element={<AuthPage/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Logout' element={<Logout/>}/> 
        <Route path='/Update_user' element={<Update_user/>}/>
        <Route path='/Userprofile' element={<UserProfile/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/Report-issue' element={<Report-Page/>}/>
        <Route path='/Explore' element={<Explore/>}/>
        <Route path='/howitworks' element={<How_it_works/>}/>
        <Route path='/contactus' element={<Contact/>}/>
        <Route path='/Error' element={<Error/>}/>
        <Route path='/' element={<Home/>}/>

        <Route path='/ForgetPassword' element={<ForgotPassword/>}/>
        <Route path='/ResetPassword/:token' element={<ResetPassword/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Register' element={<Register/>}/>

      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
