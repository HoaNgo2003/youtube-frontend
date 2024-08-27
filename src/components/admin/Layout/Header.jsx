import React, { useState } from 'react'
import logo from "../../../images/youtubelogo.png"
import avatar from "../../../images/avatar.jpg"
import logo2 from "../../../images/logo-2.webp"
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons'
import { NavLink, useNavigate } from 'react-router-dom'

const Header = () => {
  const [status, setStatus] = useState(true)
  const navigate = useNavigate()
  const handleClickLogout = ()=>{
    localStorage.removeItem("access_token");
    navigate('/login')
  }
  const handleClick = ()=>{
    setStatus(!status);
    
    const logoYoutube = document.querySelector(".header .logo-youtube")
   
    const displayLogo = document.querySelector(".logo-1")
    const displayLogo1 = document.querySelector(".logo-2")
    const sider = document.querySelector('.sider')
    const main = document.querySelector(".main")
    if(!status){displayLogo.classList.add("display")
      logoYoutube.classList.add("click")
      displayLogo1.classList.add("display")
      sider.classList.add("click")
      main.classList.add("width")
    }
      else{
        displayLogo.classList.remove("display")
      displayLogo1.classList.remove("display")
      logoYoutube.classList.remove("click")
      sider.classList.remove("click")
      main.classList.remove("width")

      }
    
  }
  
  return (
    <div className='header'>
      <div className="logo-youtube">
      <NavLink to={"/"} style={{color:"white", textDecoration: "none"}}> <img className='logo-1' src={logo} alt="" />
      <img className='logo-2' src={logo2} alt="" /></NavLink>
      </div>
      
      <div className="header-main">
        <div className="menu" onClick={()=>handleClick()}>
        <MenuOutlined />
        </div>
        <div className="avatar">
          <div className="image">
            <img src={avatar} alt="" />
          </div>
          <p>Admin</p>
         
          <div className="log-out" onClick={handleClickLogout}>
            <span>Logout</span> <LogoutOutlined />
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default Header
