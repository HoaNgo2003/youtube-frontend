import { DownOutlined, LeftOutlined, LineChartOutlined, SettingOutlined, UpOutlined, VideoCameraAddOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import logo from "../../../images/avatar.jpg"
import { NavLink } from 'react-router-dom';
const Sider = () => {
  const [status, setStatus] = useState(false);
  const [status1, setStatus1] = useState(false);
  const handleClick = (className, statusF, sta)=>{
    statusF(!sta)
    if(!sta){
      document.querySelectorAll(`${className}`).forEach(item=>{
        item.classList.add("display")
      })
    }else{
      document.querySelectorAll(`${className}`).forEach(item=>{
        item.classList.remove("display")
      })
    }
  }
 
  
  return (
    <div className='sider'>
      
      <NavLink to={"/"} style={{color:"white", textDecoration: "none"}}><div className="avatar">
        <div className="image">
          <img src={logo} alt="" />
        </div>
        <p>Admin <SettingOutlined /></p>
      </div></NavLink>

      <div className='title'>Nội dung</div>
      <div onClick={()=>handleClick(".row-sider.content1", setStatus, status)} className="row-sider heading">
      <span className='start'><VideoCameraAddOutlined /></span>

      <span className='content'>Video</span>
      <span  className='end'>{status?<DownOutlined />:<LeftOutlined />}</span>
      </div>
      <NavLink to={"/admin/videolist"} style={{color:"white", textDecoration: "none"}}><div className="row-sider content1">
        Danh sách Video
      </div></NavLink>
      
      <NavLink to={"/admin/add"} style={{color:"white", textDecoration: "none"}}><div className="row-sider content1">
        Tạo video mới
      </div></NavLink>
      <div onClick={()=>handleClick(".row-sider.content", setStatus1, status1)}  className="row-sider heading">
      <span className='start'><LineChartOutlined /></span>
      <span className='content'>Thống kê</span>
      <span  className='end'>{status1?<DownOutlined />:<LeftOutlined />}</span>
      </div>
      <NavLink to={"/admin/statics"} style={{color:"white", textDecoration: "none"}}><div className="row-sider content">
        Thống kê lượt xem
      </div></NavLink>
    </div>
  )
}

export default Sider
