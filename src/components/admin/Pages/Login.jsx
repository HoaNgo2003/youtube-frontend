import React, { useEffect, useState } from 'react'
import logo from "../../../images/youtubelogo.png"
import { EyeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link,   useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { API_BASE_URL } from '../../../helpers/config'
const Login = () => {
  const [loginForm, setLoginForm] = useState({})
  const [formError, setFormError] = useState({})
  const [isSubmit, setIsSubmit]= useState(false)
  const navigate = useNavigate()
  const handleChange = (e)=>{
    setLoginForm({
      ...loginForm,
      [e.target.name]:e.target.value
    })
    console.log(loginForm.email, loginForm.password)
  }
  useEffect(()=>{
    if(isSubmit){
      validateLoginForm()
    }
    
  },[loginForm])
  const handleSubmit = async()=>{
    let valid = validateLoginForm();
    console.log(formError)

    if(valid){
      const data = {
        email: loginForm.email,
        password: loginForm.password,
       
      }
      try {
        const res = await axios.post(`${API_BASE_URL}/auth/login`, data)
        localStorage.setItem("access_token", res.data.access_token)
        navigate("/")
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message,{
          position:"top-center"
        })
      }
      
    }
    setIsSubmit(true)
  }
  const validateLoginForm = ()=>{
    let isValid = true;
    const errors = {};
    if(loginForm.email === ''||loginForm.email===undefined){
      errors.email = "Please enter email"
    }else{
      let validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(loginForm.email)
      if(!validEmail){
        errors.email = "Please enter a valid email"
      }
    }
    
    if(loginForm.password === ''||loginForm.password===undefined){
      errors.password = "Please enter password"
    }
     
    if(Object.keys(errors).length > 0){
      setFormError(errors)
      isValid = false;
    }else{
      setFormError({})
    }
    return isValid
  }

  return (
    <div className="background">
       <form className='login-form'>
      <div className='logo'>
        <img src={logo} alt="" />
      </div>
      <div className="row-login">
      <UserOutlined />
      <input type="email" name='email'
       placeholder='Email' onChange={handleChange} />
      </div>

      <div className="row-login">
      <LockOutlined />
      <input type="password" placeholder='Password' name='password' onChange={handleChange} />
      <EyeOutlined />
      </div>
      <button type='button' onClick={handleSubmit}>Login</button>
      <p>Don't have an account?<Link to={"/signup"}><span style={{color:"red"}}>Register here</span></Link></p>
    </form>
    </div>
   
  )
}

export default Login
