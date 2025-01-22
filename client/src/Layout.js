import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
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