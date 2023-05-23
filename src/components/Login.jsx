import React from 'react'
import "./styles/Register.css";

const Login = () => {
  return (
    <div className='Register'>
        <div className="register__header">
            <h2 className='register__logo'>Chat App</h2>
            <p className='register__subheading'>Register</p>
        </div>
        <form className='register__form' action="#">
            <input type="email" className="register__email" placeholder='email'/>
            <input type="password" className="register__password" placeholder='password' />
            <button className='register__button '>Log In</button>
        </form>
        <p>you don't have an account? <span className='register__login'>register</span></p>
    </div>
  )
}

export default Login