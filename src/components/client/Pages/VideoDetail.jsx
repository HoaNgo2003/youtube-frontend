import React, { useEffect, useState } from "react";
import Header from "../Layouts/Header";
import logo from "../../../images/avatar.jpg"
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../helpers/config";
import { toast } from "react-toastify";
import { fomatTime } from "../../../helpers/format-time";
import {Link} from "react-router-dom"
const VideoDetail = () => {
    
    const [video, setVideo] = useState({})
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(false)

    const { id } = useParams()
    const getVideoById = async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/video/${id}`)
            console.log(data)
            setVideo(data)
        } catch (error) {
            toast.error(error)
        }


    }
   
    
    useEffect(() => {
        
        const getListVideo = async () => {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/video`);
                setVideos(data)

            } catch (error) {
                toast.error(error)
            }
        }
        
        getVideoById()
        getListVideo()
    }, [loading])
    const getVideoDurian = (videoId)=>{
        const video = document.getElementById(videoId);
       
        console.log(video?.duration)
         
        return fomatTime(video?.duration)
    }
    const handleClick = ()=>{

        setLoading(!loading)
    }
    const handleUpdateView = async()=>{
        console.log('hi')
        try {
            const {data} = await axios.patch(`${API_BASE_URL}/video/update/view/${id}`)
            console.log(data)
        } catch (error) {
            toast.error(error)
        }
    }
    return (
        <>
            <Header />
            <div className="video-detail">
                {video && <div className="video-audio">
                    <div className="video-content">
                        <video onPlay={handleUpdateView} src={`${API_BASE_URL}/${video.link}`} controls></video>
                    </div>
                    <div className="video-title">
                        <p className="heading">{video.title}</p>
                        <div className="video-authors">
                            <div><img src={`${API_BASE_URL}/${video.image}`} alt="" /></div>
                            <div className="author">Admin</div>
                            <div className="subscribe">Subscribe</div>
                        </div>
                        <div className="description">
                            <p>{video.description}</p>
                        </div>
                        <div className="comment">
                            <span>7 Comment</span>
                            <span>Sort by</span>
                        </div>
                        <div className="comment-detail">
                            <div className="avatar">
                                <img src={logo} alt="" />
                            </div>
                            <div className="comment-content">
                                <div className="user-name">
                                    Quang ngo
                                </div>
                                <p className="user-comment-content">
                                    Hay qua
                                </p>
                            </div>
                        </div>
                    </div>
                </div>}
                <div className="video-recommend-list item">
                {videos && videos.map((item, index) => {
                    return (
                        <>
                            <div className="video-recommend">
                                <div className="video-item">
                                    <Link onClick={handleClick} to={`/video/view/${item.id}`} style={{textDecoration:"none"}}>
                                    <div className="video-audio">
                                        <video id={`video-${index}`} src={`${API_BASE_URL}/${item.link}`}></video>
                                        <span className="time">{getVideoDurian(`video-${index}`)}</span>
                                    </div>
                                    </Link>
                                    
                                    <div className="video-title">
                                        <div className="video-heading">{item.title}</div>
                                        <div className="video-author">Admin</div>
                                        <div className="video-views">{item.view} views</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
                </div>
                

            </div>
        </>
    )
}
export default VideoDetail