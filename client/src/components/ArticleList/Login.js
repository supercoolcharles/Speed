import React from 'react';
import '../../App.css';
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
    const navigite = useNavigate()
  return (
    <div className="CreateArticle">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <br />
          <Link to="/" className="btn btn-outline-dark float-left">
              Show CreateArticle List
          </Link>
        </div>
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Account</h1>
          <p className="lead text-center" style={{color:'black'}}>
              Login
          </p>

          <form>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Username of the Account'
                name='Username'
                className='form-control'
              />
            </div>
            <br />

            <div className='form-group'>
              <input
                type='text'
                placeholder='Password of the Account'
                name='Password'
                className='form-control'
              />
            </div>

            <button className="btn btn-outline-dark btn-block mt-4" onClick={()=>{
                localStorage.setItem("token","Gavin")

                navigite("/center")
             }}>Login</button>
          </form>
      </div>
      </div>
    </div>
  </div>
)
}
