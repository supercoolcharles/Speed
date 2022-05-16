import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BetterScroll from 'better-scroll';
// import ArticleCard from './ArticleCard';

class ShowArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        articles: [],
        backarticles: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/articles')
      .then(res => {
        this.setState({
            articles: res.data,
            backarticles: res.data
        })
        new BetterScroll(".list")
      })
      .catch(err =>{
        console.log('Error from ShowArticleList');
      })
  };


  render() {
    const articles = this.state.articles;
    // console.log("PrintBook: " + articles);
    // let articleList;

    // if(!articles) {
    //     articleList = "there is no article record!";
    // } else {
    //     articleList = articles.map((article, k) =>
    //     <ArticleCard article={article} key={k} />
    //   );
    // }

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
                <br />
                <br />
                <hr />
                </div>

            </div>
            <input onInput={this.handleInput}/>
            <div className="list" style={{height:'400px',width:"980px",backgroundColor:'#b5b5b5',overflow:'hidden'}}>
                    {/* {articleList} */}
                    <div className="content">
                        {
                        articles.map((article, index)=>
                                <dl key={index}>
                                    <dt>{article.title}</dt>
                                    <dd>{article.author} </dd>
                                </dl>
                            )
                        }
                    </div>
            </div>
          <div>---</div>
          {/* <hr/> */}
        </div>
      </div>
    );
  }

  handleInput = (event) => {
    console.log("input",event.target.value)

    var newList = this.state.backarticles.filter(item=>item.title.toUpperCase().includes(event.target.value.toUpperCase())
    || item.author.toUpperCase().includes(event.target.value.toUpperCase()))

    /* console.log(newList) */

    this.setState({
        articles:newList
    })
  }
}

export default ShowArticleList;