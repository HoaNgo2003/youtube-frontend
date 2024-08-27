import { ClockCircleOutlined, DesktopOutlined, HistoryOutlined, HomeOutlined, LikeOutlined, MenuOutlined, RightOutlined, ThunderboltOutlined } from '@ant-design/icons'
import React from 'react'
 

const Sidebar = () => {
  return (
    <div className='client-sidebar'>
    <div className="colum-side">
      <div className="row">
          <span className='icon'><HomeOutlined /></span>
          <span>Trang chủ</span>
      </div>
      <div className="row">
          <span className='icon'><ThunderboltOutlined /></span>
          <span>Shorts</span>
      </div>
      <div className="row last">
          <span className='icon'><DesktopOutlined /></span>
          <span>Kênh đăng ký</span>
      </div>
    </div>
    <div className="colum-side">
      <div className="row">
        <span>You</span>
        <span style={{fontSize:"12px"}}><RightOutlined /></span>
      </div>
      <div className="row">
          <span className='icon'><HistoryOutlined /></span>
          <span>History</span>
      </div>
      <div className="row">
          <span className='icon'><MenuOutlined /></span>
          <span>Play list</span>
      </div>
      <div className="row last">
          <span className='icon'><ClockCircleOutlined /></span>
          <span>Xem sau</span>
      </div>
      <div className="row last">
          <span className='icon'><LikeOutlined /></span>
          <span>Liked video</span>
      </div>
      
    </div>
    <div className="colum-side">
      <div className="row">
        <span>Explore</span>
        <span style={{fontSize:"12px"}}><RightOutlined /></span>
      </div>
      <div className="row">
          <span className='icon'><HistoryOutlined /></span>
          <span>Trending</span>
      </div>
      <div className="row">
          <span className='icon'><MenuOutlined /></span>
          <span>Musics</span>
      </div>
      <div className="row last">
          <span className='icon'><ClockCircleOutlined /></span>
          <span>Game</span>
      </div>
      <div className="row last">
          <span className='icon'><LikeOutlined /></span>
          <span>News</span>
      </div>
      <div className="row last">
          <span className='icon'><LikeOutlined /></span>
          <span>Sports</span>
      </div>
    </div>
    </div>
  )
}

export default Sidebar