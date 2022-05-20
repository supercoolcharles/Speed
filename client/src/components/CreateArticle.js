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
      journal_name:'',
      published_date:'',
      volume:'',
      number:'',
      pages:'',
      DOI:''
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
      journal_name: this.state.journal_name,
      published_date: this.state.published_date,
      volume: this.state.volume,
      number: this.state.number,
      pages: this.state.pages,
      DOI: this.state.DOI
    };

    axios
      .post('http://localhost:8082/api/articles', data)
      .then(res => {
        this.setState({
            title: '',
            author:'',
            journal_name:'',
            published_date:'',
            volume:'',
            number:'',
            pages:'',
            DOI:''
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
                    placeholder='Title of the CreateArticle'
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
                    placeholder='journal name of this Article'
                    name='journal_name'
                    className='form-control'
                    value={this.state.journal_name}
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
                    placeholder='volume of this Book'
                    name='volume'
                    className='form-control'
                    value={this.state.volume}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='number of this Book'
                    name='number'
                    className='form-control'
                    value={this.state.number}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='pages of this Book'
                    name='pages'
                    className='form-control'
                    value={this.state.pages}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='DOI of this Book'
                    name='DOI'
                    className='form-control'
                    value={this.state.DOI}
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