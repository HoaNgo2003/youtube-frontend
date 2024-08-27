import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL, config } from '../../../helpers/config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import logo from "../../../images/logo-2.webp"
const AddVideoForm = () => {
  const navigate = useNavigate()
  const [videoData, setVideoData]= useState({})
  const [category, setCategory] = useState([])
  const handleChange = (e)=>{
    setVideoData({
      ...videoData,
      [e.target.name]: e.target.value
    })
  }
  useEffect(()=>{
    const getAllCategory = async()=>{
      const {data} =await axios.get(`${API_BASE_URL}/category`)
      setCategory(data)
      console.log(data)
    }
    getAllCategory()
  },[])
  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(videoData)
    setVideoData({
      ...videoData
      
    })
    try {
       
      const dataReq = {
        link:"link 1",
        image: "",
        title: videoData.title,
        description: videoData.description,
        file:videoData.file,
        categoryId: videoData.categoryId,
        view: 0
      }
       console.log(dataReq)
      const data = await axios.post(`${API_BASE_URL}/video/create`,dataReq, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'multipart/form-data'
        }
      }
      )
     console.log(data)
    toast.success("Create video success", {position:"top-center"})
    navigate(`/admin/upload/${data.data.id}`)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error)
    }
    
  }
  const handleImageChange = (e)=>{
    if(e.target.files){
      const file = e.target.files[0]
      let reader = new FileReader()
      reader.onload = (e)=>{
        setVideoData({
          ...videoData, preImage: reader.result, file:file
        })
      }
      console.log(videoData)
      reader.readAsDataURL(file)
    }
  }
   
  return (
    <div>
      <h1>Tạo video</h1>
      <form action="" className='add-video'>
        <div className="add-row">
          <span>Kênh phát hành:</span>
          <span style={{color:"black"}}>Admin</span>
        </div>
        <div className="add-row">
          <span>Tiêu đề</span>
          <input name='title' type="text" onChange={handleChange} placeholder='Tiêu đề' />
        </div>
        <div className="add-row">
          <span>Ảnh đại diện</span>
          <img src={videoData.preImage} alt="" style={{height:"200px", width:"200px", objectFit:"contain"}}/>
          <input className='input-file' name='image'  onChange={handleImageChange} type="file" placeholder='Image' />
        </div>
        <div className="add-row">
          <span>Mô tả</span>
          <textarea  onChange={handleChange} name="description" id="" placeholder='Mô tả'></textarea>
        </div>
        <div className="add-row">
          <span>Thể loại</span>
           <select  onChange={handleChange} name="categoryId" id="">
            <option selected value="funny">---Choose---</option>
            {category && category.map((item, index)=><>
              <option key={index} value={item.value}>{item.value}
              </option>

            </>)}
           
            
           </select>
        </div>
         
        <button onClick={handleSubmit}>Thêm video</button>
      </form>
    </div>
  )
}

export default AddVideoForm
