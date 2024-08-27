import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL, config } from '../../../helpers/config'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import logo from "../../../images/logo-2.webp"
const UploadVideoForm = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [videoData, setVideoData]= useState({})
  
  console.log(id)
  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(videoData)
    setVideoData({
      ...videoData
      
    })
    try {
       
      const dataReq = {
        video: videoData.video
      }
       console.log(dataReq)
      const data = await axios.post(`${API_BASE_URL}/video/upload/${id}`,dataReq, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'multipart/form-data'
        }
      }
      )
     
    toast.success("Upload video success", {position:"top-center"})
    navigate('/admin/videolist')
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error)
    }
    
  }
  
  const handleVideoChange = (e) =>{
    if(e.target.files[0]){
      const file = e.target.files[0]
      let reader = new FileReader()
      reader.onload = (e)=>{
        setVideoData({
          ...videoData, preVideo: reader.result, video:file
        })
      }
      console.log(videoData)
      reader.readAsDataURL(file)
    }
  }
  return (
    <div>
      <h1>Upload video</h1>
      <form action="" className='add-video'>
        <div className="add-row">
          <span>Kênh phát hành:</span>
          <span style={{color:"black"}}>Admin</span>
        </div>
        <div className="add-row">
          <span>Link video</span>
          <video src={videoData.preVideo} alt="" style={{height:"200px", width:"200px", objectFit:"contain"}}/>
          <input className='input-file'  onChange={handleVideoChange} name='link' type="file" placeholder='Link video' />
        </div>
        <button onClick={handleSubmit}>Thêm video</button>
      </form>
    </div>
  )
}

export default UploadVideoForm
