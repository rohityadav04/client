import React from 'react'
import Home from './components/Home'
import Login from './components/Login'
import {Routes,Route} from "react-router-dom"
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Welcome from './pages/Welcome'
import PageNotFound from './pages/notFound/PageNotFound'
import { Navigate } from 'react-router-dom'
import PasswordReset from './components/PasswordReset'
import ForgotPassword from './components/ForgotPassword'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}>
      <Route index element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/password-reset' element={<PasswordReset/>}/>
      <Route path="/forgotpassword/:id/:token" element={<ForgotPassword/>}/>
      
      </Route>
      <Route path='/dash' element={<Welcome/>}/>
      <Route path="/not-found" element={<PageNotFound />} />

<Route path="*" element={<Navigate to="/not-found" />} />
      {/* <Route path='/dash' element={<Dashboard/>}/> */}


    </Routes>
    </>
  )
}

export default App
