import { useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
//import Register from './pages/Register'
import Login from './pages/Login'
//import Update_user from './components/Update_user'
//import AuthPage from './pages/AuthPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Register /> */}
    <Login/> 
    {/* <Update_user/> */}
    </>
  )
}

export default App
