import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../helpers/config'
import image from "../../../images/download.jpeg"
import { Link } from "react-router-dom";
import moment from 'moment';
import { fomatTime } from '../../../helpers/format-time';
import { toast } from 'react-toastify';
const Video = () => {
    const [category, setCategory] = useState([])
    const [video, setVideo] = useState([])
    useEffect(() => {
        const getAllCategory = async () => {
            const { data } = await axios.get(`${API_BASE_URL}/category`)
            setCategory(data)
            console.log(data)
        }
        const getVideoList = async () => {
            const { data } = await axios.get(`${API_BASE_URL}/video`)
            setVideo(data)
        }
        getAllCategory()
        getVideoList()
    }, [])
    const getVideoDurian = (videoId)=>{
        const video = document.getElementById(videoId);
       
        console.log(video?.duration)
         
        return fomatTime(video?.duration)
    }
    
    return (
        <>
            <div className='category'>
                {category && category.map(item => {
                    return <span >{item.value}</span>
                })}
            </div>
            <div className="video-lists">
                {video && video.map((item, index) => {
                    return (
                        <>
                            <div className="video-item">
                                <div className="video-content">
                                    <Link to={`/video/view/${item.id}`}><video id={`video-${index}`} src={`${API_BASE_URL}/${item.link}`} ></video></Link>
                                    <span className='time-video'>{getVideoDurian(`video-${index}`)}</span>
                                </div>
                                <div className="video-description">
                                    <div className="logo"><img src={`${API_BASE_URL}/${item.image}`} alt="" /></div>
                                    <div className="video-title">
                                        <Link style={{textDecoration:"none", color:"black"}} to={`${API_BASE_URL}/${item.link}`}>
                                            <div className='video-heading'>{item.title}</div>
                                            <div className='video-author'>{item.author}</div>
                                            <div className='video-views'><span>{item.view} views</span></div>
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}


            </div>
        </>
    )
}

export default Video