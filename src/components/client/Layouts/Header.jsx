import { AudioOutlined, BellOutlined, MenuOutlined, SearchOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import React from 'react'
import logo from "../../../images/logo-2.webp"
import {Link} from "react-router-dom"
const Header = () => {
  return (
    <div className='client-header'>
      <Link to={'/home'} style={{textDecoration:"none", color:"black"}}>
      <div className="section-left">
        <div><MenuOutlined /></div>
        <div className='image'><img src={logo} alt="" />
        </div>
        <p className='brand'>YouTube</p>

      </div>
      </Link>
      
      <div className="section-center">
        <input type="text" placeholder='Search' />
        <span className='search-icon'><SearchOutlined /></span>
        <span className='audio-icon'><AudioOutlined /></span>
      </div>
      <div className="section-right">
        <span><VideoCameraOutlined /></span>
        <span><BellOutlined /></span>
        <span><UserOutlined /></span>
      </div>
       
    </div>
  )
}

export default Header