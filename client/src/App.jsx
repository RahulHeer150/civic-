import { useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
//import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './components/ForgetPassword'
import ResetPassword from './components/Reset_password'
import AuthPage from './pages/AuthPage'
//import Update_user from './components/Update_user'
//import AuthPage from './pages/AuthPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Register /> */}
    {/* <Login/>  */}
    {/* <Update_user/> */}
    <ForgotPassword/>
    <ResetPassword/>
    <AuthPage/>
    </>
  )
}

export default App
