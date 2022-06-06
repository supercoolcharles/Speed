import React, { Component } from 'react'
import '../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Center extends Component {
    constructor() {
        super();
        this.state = {
          Username: '',
          Password:''
        };
      }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
      onSubmit = e => {
        e.preventDefault();
    
        const data = {
          Username: this.state.Username,
          Password: this.state.Password
        };
    
        axios
          .post('http://localhost:8082/api/articles', data)
          .then(res => {
            this.setState({
                Username: '',
                Password:''
            })
            this.props.history.push('/');
          })
          .catch(err => {
            console.log("Error in Login!");
          })
      };
  render() {
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

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Username of the Account'
                    name='Username'
                    className='form-control'
                    value={this.state.Username}
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Password of the Account'
                    name='Password'
                    className='form-control'
                    value={this.state.Password}
                    onChange={this.onChange}
                  />
                </div>

                
                <input
                    type="submit"
                    value="submit"
                    className="btn btn-outline-dark btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    )
  }
}
