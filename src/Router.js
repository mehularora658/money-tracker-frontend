import React from 'react'
import {Routes,Route} from 'react-router-dom'
import CreateAccount from './components/CreateAccount'
import Login from './components/Login'
import App from './App'
import Protected from './components/Protected'
import Home from './components/Home'
import Nav from './components/Nav'
const Router = () => {
    return (
        <>
        <Nav/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/dashboard' element={<Protected Component={App}/>}/>


            <Route path='/login' element={<Login/>}/>
            <Route path='/createAccount' element={<CreateAccount/>}/>
        </Routes>
        </>
    )
}

export default Router