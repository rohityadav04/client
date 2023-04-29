import React from 'react'
import Avatar from '@mui/material/Avatar';
import './header.css';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <>
    <header>
        <nav>
            <h1>RP Cloud</h1>
            <div className='avtar'>
            <Avatar style={{backgroundColor:"blue"}}>R</Avatar>
            </div>
        </nav>
    </header>

      <Outlet/>
    </>
  )
}

export default Home
