import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Select from 'react-select';
import { API_BASE_URL, config } from '../../../helpers/config'
import { toast } from 'react-toastify'

const EditVideoForm = () => {
  const navigate = useNavigate()
  const [videoData, setVideoData]= useState({})
  const [category, setCategory] = useState([])
  const param = useParams()
  const {id} = param
   
   
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
  useEffect(()=>{
    const getVideoDetail = async()=>{
      const data = await axios.get(`${API_BASE_URL}/video/${id}`)
      setVideoData({
        ...videoData,
        ...data.data
      })
      
    }
    
    getVideoDetail()
    console.log(videoData)
  },[])
  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(videoData)
    try {
      const data = await axios.patch(`${API_BASE_URL}/video/update/${id}`,videoData, config)
    console.log(data)
    navigate(`/admin/upload/${id}`)
    } catch (error) {
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
      <h1>Update video</h1>
      <form action="" className='add-video'>
        <div className="add-row">
          <span>Kênh phát hành:</span>
          <span style={{color:"black"}}>Admin</span>
        </div>
        <div className="add-row">
          <span>Tiêu đề</span>
          <input name='title' defaultValue={videoData.title} type="text" onChange={handleChange} placeholder='Tiêu đề' />
        </div>
        <div className="add-row">
          <span>Ảnh đại diện</span>
          <img src={videoData.preImage==null?`${API_BASE_URL}/${videoData.image}`:""} alt="" style={{height:"200px", width:"200px", objectFit:"contain"}}/>
          <input className='input-file' name='image'  onChange={handleImageChange} type="file" placeholder='Image' />
        </div>
        <div className="add-row">
          <span>Mô tả</span>
          <textarea defaultValue={videoData.description}  onChange={handleChange} name="description" id="" placeholder='Mô tả'></textarea>
        </div>
        <div className="add-row">
          <span>Thể loại</span>
           <select  onChange={handleChange} name="categoryId" id="">
            <option value="">---Choose---</option>
            {category && category.map((item, index)=><>
              {videoData.categoryId===item.value?<option selected key={index} value={item.value}>{item.value}</option>:<option key={index} value={item.value}>{item.value}</option>}
            </>)}
           </select>
          
        </div>
         
        <button onClick={handleSubmit}>Update video</button>
      </form>
    </div>
  )
}

export default EditVideoForm
