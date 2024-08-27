import React, { useEffect, useState } from 'react'
import logo from "../../../images/youtubelogo.png"
import { EyeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import  { API_BASE_URL } from '../../../helpers/config'
import axios from 'axios'
import { toast } from 'react-toastify'
const Register = () => {
  const [RegisterForm, setRegisterForm] = useState({})
  const [formError, setFormError] = useState({})
  const [isSubmit, setIsSubmit]= useState(false)
  const navigate = useNavigate()
  useEffect(()=>{
    if(isSubmit){
      validateRegisterForm()
    }
    
  },[RegisterForm])
  const handleChange = (e)=>{
    
    setRegisterForm({
      ...RegisterForm,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async()=>{
    let valid = validateRegisterForm();
    console.log(formError)

    if(valid){
      const data = {
        email: RegisterForm.email,
        password: RegisterForm.password,
        username: RegisterForm.username
      }
      try {
        const res = await axios.post(`${API_BASE_URL}/auth/register`, data)
        toast.apply("register succes login to continue",{
          position:"top-center"
        })
        navigate('/login')
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message,{
          position:"top-center"
        })
      }
      
    }
    setIsSubmit(true)
  }
  const validateRegisterForm = ()=>{
    let isValid = true;
    const errors = {};
    if(RegisterForm.email === ''||RegisterForm.email===undefined){
      errors.email = "Please enter email"
    }else{
      let validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(RegisterForm.email)
      if(!validEmail){
        errors.email = "Please enter a valid email"
      }
    }
    if(RegisterForm.username === ''||RegisterForm.username===undefined){
      errors.username = "Please enter username"
    }
    if(RegisterForm.password === ''||RegisterForm.password===undefined){
      errors.password = "Please enter password"
    }
    else if(RegisterForm.password !== RegisterForm.passwordConfirm){
      console.log(RegisterForm.password, RegisterForm.passwordConfirm)
      errors.password = "Confirm password doens't match"
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
    <div>
      <div className="background">
       <form className='login-form'>
      <div className='logo'>
        <img src={logo} alt="" />
      </div>
      <div className="row-login">
      <UserOutlined />
      <input type="email" name="email" onChange={handleChange}
       placeholder='Email' />
      </div>
      {formError.email && <span style={{color:"red"}}>{formError.email}</span>}
      <div className="row-login">
      <UserOutlined />
      <input type="text" name="username" onChange={handleChange}
       placeholder='Username' />
      </div>
      {formError.username && <span style={{color:"red"}}>{formError.username}</span>}
      <div className="row-login">
      <LockOutlined />
      <input type="password" onChange={handleChange}name="password"placeholder='Password' />
      <EyeOutlined />
      </div>
      {formError.password && <span style={{color:"red"}}>{formError.password}</span>}
      <div className="row-login">
      <LockOutlined />
      <input type="password" name="passwordConfirm" onChange={handleChange}placeholder='Confirm password' />
      <EyeOutlined />
      </div>
      {formError.password && <span style={{color:"red"}}>{formError.password}</span>}
      <button type='button' onClick={handleSubmit}>Register</button>
      <p>Already has an account?<Link to={"/login"}><span style={{color:"red"}}>Login</span></Link></p>
    </form>
    </div>
    </div>
  )
}

export default Register
