import React from 'react'
import Header from '../Layouts/Header'
import Sidebar from '../Layouts/Sidebar'
import { Outlet } from 'react-router-dom'
// import Header from '../Layout/Header'
// import Sidebar from '../Layout/Sidebar'
// import { Outlet } from 'react-router-dom'
// import Footer from '../Layout/Footer'
 

const Home = () => {
  return (
    <>
    <Header/>
    <Sidebar/>
    <div className="client-main">
        <Outlet/>
    </div>
   
    </>
  )
}

export default Home