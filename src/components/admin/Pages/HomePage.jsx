import React from 'react'
import Header from '../Layout/Header'
import Sider from '../Layout/Sider'
import Footer from '../Layout/Footer'
import { Outlet } from 'react-router-dom'
import { VideoCameraFilled } from '@ant-design/icons'
import HomeContent from './HomeContent'

const HomePage = () => {
  return (
    <>
      <Header/>
      <Sider/>
      <main className='main'>
        
      <Outlet/>
      </main>
      
      <Footer/>
    </>
  )
}

export default HomePage
