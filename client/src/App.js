import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import CreateArticle from './components/CreateArticle';
import ShowArticleList from './components/ShowArticleList';
import ShowArticleDetails from './components/ShowArticleDetails';
import UpdateArticleInfo from './components/UpdateArticleInfo';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
          <Route exact path='/' element={<ShowArticleList />} />
          <Route path='/create-article' element={<CreateArticle />} />
          <Route path='/edit-article/:id' element={<UpdateArticleInfo />} />
          <Route path='/show-article/:id' element={<ShowArticleDetails />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
