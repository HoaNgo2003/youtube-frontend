import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_BASE_URL, config } from '../../../helpers/config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
const VideoList = () => {
  const [state, setState] = useState(false);
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [search, setSearch] = useState()
  const [loading, setLoading] = useState(true)
  const handleClick = (e, action)=>{
    document.querySelectorAll(".video-control .item-control").forEach(item=>{
      item.classList.remove("click");
    })
    if(action==="search"){
      setState(true)
    }else{
      setState(false)
    }
    e.target.classList.add("click");
  }
  useEffect(()=>{
    const getVideo = async()=>{
      const data =  await axios.get(`${API_BASE_URL}/video`)
      setData(data.data)
      
    }

    getVideo()
     
  },[loading])
  const handleDelete = async(id)=>{
     
    const confirm = window.confirm("Do you want to delete this video?")
    if(confirm){
       
      try {
        const data = await axios.delete(`${API_BASE_URL}/video/delete/${id}`,{headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})
        toast("Delete success", {position:"top-center"})
        console.log(data)
        setLoading(!loading)
      } catch (error) {
        toast.error(error.response.data.message,{
          position:"top-center"
        })
      }
    }
  }
  const handleUpdate = (id)=>{
    navigate(`/admin/edit/${id}`)
  }
  const handleSearchChange = (e)=>{
    setSearch({
      ...search,
      [e.target.name]:e.target.value
    })
  }
  const handleSearch = (e)=>{
    e.preventDefault()
    console.log(search)
    const filterData = data.filter((item)=>{
      return item.title.includes(search.search)
    })
    if(filterData)
    setData(filterData)
  }
  const formatDate = (date)=>{
    return moment(date).format('DD/MM/YYYY h:mm:ss A')
  }
  console.log(data)
  return (
    <div>
      <h1>Danh sách video</h1>
      <div className="video-control">
        <div onClick={(e)=>handleClick(e, "list")} className="item-control click">
          Video đã tạo
        </div>
        <div onClick={(e)=>handleClick(e, "search")}  className="item-control">
          Tìm kiếm video
        </div>
      </div>
      {state?<>
        <div className="form-search">
        <form action="">
          <input name='search' type="text" placeholder="Enter keyword to search" onChange={handleSearchChange} />
          <button onClick={handleSearch}>Search</button>
        </form>
      </div>
      </>:<></>}
      
      <div className="table">
      <table>
        <tr className="table-heading">
          <th>Ảnh đại diện</th>
          <th>Tiêu đề</th>
          <th>Mô tả</th>
          <th>Link video</th>
          <th>View</th>
          <th>Category</th>
          <th>Thời gian cập nhật</th>
          <th>Thao tác</th>
        </tr>
       
          {data &&
          data.map(item=><>
            <tr id-item={item.id}>
            <td><img style={{width:"100px", height:"100px",objectFit:"contain"}} src={`${API_BASE_URL}/${item.image}`} alt="" /></td>
          <td>{item.title}</td>
          <td>{item.description}</td>
          <td><a href={`${API_BASE_URL}/${item.link}`}>Link video</a></td>
          <td>{item.view}</td>
          <td>{item.categoryId}</td>
          <td>{formatDate(item.create_at)}</td>
          <td><button className="delete" onClick={()=>handleDelete(item.id)}>Xoá</button>
          <button className="edit" onClick={()=>handleUpdate(item.id)}>Sửa</button>
          </td>
          </tr>
          </>)
          
          
          }
          
          
        
      </table>
      </div>
      
    </div>
  )
}

export default VideoList
