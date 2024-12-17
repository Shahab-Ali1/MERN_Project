import React from 'react'
import { Route, Routes } from 'react-router'
import LoginForm from '../Components/Auth/Login'

function AuthRoutes() {
  return (
    <Routes>
        <Route exact path='/' element={<LoginForm/>}/>
        <Route path='/login' element={<LoginForm/>}/>
    </Routes>
  )
}

export default AuthRoutes
