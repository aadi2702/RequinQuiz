import React, { useEffect } from 'react'
import Header from './components/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './components/Footer'

const Layout = () => {
  return (
    <div className='y-overflow-scroll no-scrollbar'>
        <Header />
        <Outlet />
        <Footer /> 
    </div>
  ) 
}
  
export default Layout