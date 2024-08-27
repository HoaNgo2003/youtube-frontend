import { VideoCameraFilled } from '@ant-design/icons'
import React from 'react'

const HomeContent = () => {
  return (
    <>
      <h1>Bảng điều khiển</h1>
        <div className="video-container">
          <div className="title">
            <span>Tạo mới</span>
          <span className='video'>Video</span>
          </div>
          
          <div className="icon"><VideoCameraFilled /></div>
        </div>
    </>
  )
}

export default HomeContent
