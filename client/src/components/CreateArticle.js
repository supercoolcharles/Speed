import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class CreateArticle extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      author:'',
      source:'',
      published_date:'',
      claim:'',
      evidence:'',
      status:'',
      DOI:'',
      types:''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      title: this.state.title,
      author: this.state.author,
      source: this.state.source,
      published_date: this.state.published_date,
      claim: this.state.claim,
      evidence: this.state.evidence,
      status: this.state.status,
      DOI: this.state.DOI,
      types:this.state.types
    };

    axios
      .post('http://localhost:8082/api/articles', data)
      .then(res => {
        this.setState({
            title: '',
            author:'',
            source:'',
            published_date:'',
            claim:'',
            evidence:'',
            status:'',
            DOI:'',
            types:''
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in CreateBook!");
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
              <h1 className="display-4 text-center">Add CreateArticle</h1>
              <p className="lead text-center"  style={{color:'black'}}>
                  Create new CreateArticle
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Title of the Article'
                    name='title'
                    className='form-control'
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Author'
                    name='author'
                    className='form-control'
                    value={this.state.author}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='source of this Article'
                    name='source'
                    className='form-control'
                    value={this.state.source}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='date'
                    placeholder='published_date'
                    name='published_date'
                    className='form-control'
                    value={this.state.published_date}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='claim'
                    name='claim'
                    className='form-control'
                    value={this.state.claim}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='evidence'
                    name='evidence'
                    className='form-control'
                    value={this.state.evidence}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='status of this Book'
                    name='status'
                    className='form-control'
                    value={this.state.status}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='DOI of this Article'
                    name='DOI'
                    className='form-control'
                    value={this.state.DOI}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='types of this Article'
                    name='types'
                    className='form-control'
                    value={this.state.types}
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
    );
  }
}

export default CreateArticle;