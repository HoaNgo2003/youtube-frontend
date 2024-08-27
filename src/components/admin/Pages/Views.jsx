import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../helpers/config'
import moment from 'moment'
import { toast } from 'react-toastify'

const Views = () => {
  const [keyword, setKeyword] = useState(null)
  const [data, setData] = useState([])
  const [time, setTime] = useState({})
  const [selectVideo, setSelectVideo] = useState([])
  const [count, setCount] = useState(0)
  const [videoSelectView, setVideoSelectView] = useState([])
  const handleSearch = async(e)=>{ 
    e.preventDefault()
    const {data} = await axios.get(`${API_BASE_URL}/video?keyword=${keyword}`)
    console.log(data)
    setData(data)
  }
  const handleSearchChange = (e)=>{
    setKeyword(e.target.value)

  }
  const handleChange = (e)=>{
    setTime({...time,
      [e.target.name]: e.target.value,
      
    })
    console.log(time)
  }
  const formatDate = (date)=>{
    return moment(date).format('DD/MM/YYYY h:mm:ss A')
  }
  const handleSelectVideo = (index)=>{
   setSelectVideo([...selectVideo, data[index]])
  }
  console.log(selectVideo)
  const handleClick = ()=>{
    setCount(0)
    const arr = selectVideo.map(async (video)=>{
       
        const {data} =await axios.get(`${API_BASE_URL}/video/view/${video.id}?start=${time.start}&&end=${time.end}`)
        console.log(data)
        setCount((count)=>count+Number(data.view))

        return {...video, data}

      
    })
    setVideoSelectView([])
    arr.forEach(item=>{
      item.then(data=>setVideoSelectView((prev)=>[
        ...prev,{...data}
      ]))
      .catch(error=>toast.error(error))
    })
     
    console.log(videoSelectView.sort((a, b)=>a.title < b.title))
  }
  console.log(videoSelectView)
  return (
    <div>
       
      <h1>Thống kê</h1>
      <div className="form-search">
        <form action="">
          <input name='search' type="text" placeholder="Enter keyword to search" onChange={handleSearchChange} />
          <button onClick={handleSearch}>Search</button>
        </form>
      </div>
      <div className="table">
      <table>
        <tr className="table-heading">
          <th>Ảnh đại diện</th>
          <th>Tiêu đề</th>
          <th>Thời gian cập nhật</th>
          <th>Xem</th>
        </tr>
       
          {data &&
          data.map((item, index)=><>
            <tr id-item={item.id}>
            <td><img style={{width:"100px", height:"100px",objectFit:"contain"}} src={`${API_BASE_URL}/${item.image}`} alt="" /></td>
          <td>{item.title}</td>
          <td>{formatDate(item.create_at)}</td>
           <td><input type='checkbox' onClick={()=>handleSelectVideo(index)}/></td>
          </tr>
          </>)
          
          
          }
          
          
        
      </table>
      </div>
      <table className='static-search'>
        <tr>
          
          <th>Từ</th>
          <th>Đến</th>
           
        </tr>
        <tr>
           
          <td>
            <input type="date" name='start' onChange={handleChange}/>
          </td>
          <td>
            <input type="date" name='end' onChange={handleChange}/>
          </td>
         
        </tr>
      </table>
      <div className="search">
        <button onClick={handleClick}>Xem thống kê</button>
      </div>
      <table className="static">
      <tr>
        <th>Kênh</th>
        <th>Video</th>
        <th>Lượt truy cập</th>
      </tr>
      {videoSelectView && videoSelectView.map((video, index)=>
        
        <tr>
        <td>Admin</td>
        <td>{video.title}</td>
        <td>{video?.data?.view}</td>
      </tr>
      )}
      
       <tr>
        <td>Tổng</td>
        <td></td>
        <td>{count}</td>
       </tr>
      </table>
    </div>
  )
}

export default Views
