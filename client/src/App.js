import React, { Component } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

import CreateArticle from './components/CreateArticle';
import ShowArticleList from './components/ShowArticleList';
import ShowArticleDetails from './components/ShowArticleDetails';
import UpdateArticleInfo from './components/UpdateArticleInfo';
import NotFound from './components/NotFound';
import TDD from './components/ArticleList/TDDlist';
import MOD from './components/ArticleList/MODlist';
import Center from './components/Center';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
          <Route path='/articlelist' element={<ShowArticleList />} >
            <Route index element={<TDD />} />
            <Route path='TDD' element={<TDD />} />
            <Route path='MOD' element={<MOD />} />
          </Route>
          <Route path='/create-article' element={<CreateArticle />} />
          <Route path='/edit-article/:id' element={<UpdateArticleInfo />} />
          <Route path='/show-article/:id' element={<ShowArticleDetails />} />
          <Route path='/center' element={<Center />} />
          <Route path='/' element={<Navigate to="/articlelist" />} />
          <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
