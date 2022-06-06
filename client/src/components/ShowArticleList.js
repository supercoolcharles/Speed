import React, { Component } from 'react';
import '../App.css';
import { Link, Outlet,NavLink } from 'react-router-dom';
// import ArticleCard from './ArticleCard';

class ShowArticleList extends Component {
  render() {

    return (
            <div className="ShowArticleList">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        <br />
                        <h2 className="display-4 text-center">Articles List</h2>
                        </div>

                        <div className="col-md-11">
                        <Link to="/create-article" className="btn btn-outline-dark float-left">
                            + Add New Articles
                        </Link>
                        <Link to="/center" className="btn btn-outline-dark float-left">
                            Account
                        </Link>
                        <br />
                        <br />
                        <hr />
                        </div>

                    </div>
                    <div>
                        <ul className="navbar">
                            <li><NavLink to='TDD'>TDD</NavLink></li>
                            <li><NavLink to = "MOD">Mob programming</NavLink></li>
                        </ul>
                    </div>

                    <Outlet></Outlet>
                <div>---</div>
                {/* <hr/> */}
                </div>
            </div>
    );
  }
}

export default ShowArticleList;