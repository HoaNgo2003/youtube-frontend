import axois from "axios"
export const jwt = localStorage.getItem("jwt")
export const API_BASE_URL = "https://youtube-backend-c1wi.onrender.com"
// export const api = axois.create({
//     baseURL: API_BASE_URL,
//     headers:{
//         "Authorization": `Bearer ${jwt}`,
//         'Content-Type':'application/json'
//     }
// })
export const config = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }