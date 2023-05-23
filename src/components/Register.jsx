import React from 'react'
import "./styles/Register.css";

const Register = () => {
  return (
    <div className='Register'>
        <div className="register__header">
            <h2 className='register__logo'>Chat App</h2>
            <p className='register__subheading'>Register</p>
        </div>
        <form className='register__form' action="#">
            <input type="text" className="register__name" placeholder='display name' />
            <input type="email" className="register__email" placeholder='email'/>
            <input type="password" className="register__password" placeholder='password' />
            <input  type="file" id="register__file" />
            <label htmlFor="register__file" className='register__file-label'>
                <img src="https://raw.githubusercontent.com/safak/youtube2022/react-chat/src/img/addAvatar.png" alt="add icon" />
                <span>Add an avatar</span>
            </label>
            <button className='register__button '>Sign up</button>
        </form>
        <p>you do have an account? <span className='register__login'>Login</span></p>
    </div>
  )
}

export default Register