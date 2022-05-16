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
        backarticles: [],

        title: '',
        author:'',
        DOI:"",
        number:"",
        journal_name:"",
        published_date:"",
        volume:"",
        pages:""
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
                    <div className="list" style={{height:'415px',width:"480px",backgroundColor:'#b5b5b5',overflow:'hidden'}}>
                            {/* {articleList} */}
                            <div className="content">
                                {
                                articles.map((article, index)=>
                                        <FilmItem key ={index} {...article}
                                        onEvent={(value)=>{
                                            
                                            this.setState({
                                                DOI:value
                                            })
                                        }}
                                        onEvent2={(value)=>{
                                            // console.log("CtoP",value)
                                            this.setState({
                                                number:value
                                            })
                                        }}
                                        onEvent3={(value)=>{
                                            // console.log("CtoP",value)
                                            this.setState({
                                                journal_name:value
                                            })
                                        }}
                                        onEvent4={(value)=>{
                                            // console.log("CtoP",value)
                                            this.setState({
                                                published_date:value
                                            })
                                        }}
                                        onEvent5={(value)=>{
                                            // console.log("CtoP",value)
                                            this.setState({
                                                volume:value
                                            })
                                        }}
                                        onEvent6={(value)=>{
                                            // console.log("CtoP",value)
                                            this.setState({
                                                pages:value
                                            })
                                        }}
                                        onEvent7={(value)=>{
                                            // console.log("CtoP",value)
                                            this.setState({
                                                title:value
                                            })
                                        }}
                                        onEvent8={(value)=>{
                                            // console.log("CtoP",value)
                                            this.setState({
                                                author:value
                                            })
                                        }}></FilmItem>
                                        // <dl key={index}>
                                        //     <dt>{article.title}</dt>
                                        //     <dd>{article.author} </dd>
                                        // </dl>
                                    )
                                }
                            </div>
                    </div>
                    <FilmDetail DOI={this.state.DOI} 
                    number={this.state.number}
                    journal_name={this.state.journal_name}
                    published_date={this.state.published_date}
                    volume={this.state.volume}
                    pages={this.state.pages}
                    title={this.state.title}
                    author={this.state.author}></FilmDetail>
                <div>---</div>
                {/* <hr/> */}
                </div>
            </div>
    );
  }

  handleInput = (event) => {
    console.log("input",event.target.value)

    var newList = this.state.backarticles.filter(item=>item.title.toUpperCase().includes(event.target.value.toUpperCase())
    || item.author.toUpperCase().includes(event.target.value.toUpperCase())
    || item.journal_name.toUpperCase().includes(event.target.value.toUpperCase())
    || item.published_date.toUpperCase().includes(event.target.value.toUpperCase())
    || item.volume.toUpperCase().includes(event.target.value.toUpperCase())
    || item.number.toUpperCase().includes(event.target.value.toUpperCase())
    || item.pages.toUpperCase().includes(event.target.value.toUpperCase())
    || item.DOI.toUpperCase().includes(event.target.value.toUpperCase()))

    /* console.log(newList) */

    this.setState({
        articles:newList
    })
  }
}

export default ShowArticleList;

class FilmItem extends Component{
    render(){
        let {title,author,DOI,number,journal_name,published_date,volume,pages} = this.props
        return(
            <div className="articleitem" onClick={()=>{
                // console.log(value)
                this.props.onEvent7(title)
                this.props.onEvent8(author)
                this.props.onEvent(DOI)
                this.props.onEvent2(number)
                this.props.onEvent3(journal_name)
                this.props.onEvent4(published_date)
                this.props.onEvent5(volume)
                this.props.onEvent6(pages)
            }}>
                <dl>
                    <dt>{title}</dt>
                    <dd>{author} </dd>
                </dl>
            </div>
        )
        
    }
}

class FilmDetail extends Component{
    render(){
        // console.log(this.props.info,this.props.info2)
        return <div className="articledetail">
            <lii>title</lii><br/>
            {this.props.title}<br/>
            <lii>author</lii><br/>
            {this.props.author}<br/>
            <lii>journal_name</lii><br/>
            {this.props.journal_name}<br/>
            <lii>published_date</lii><br/>
            {this.props.published_date}<br/>
            <lii>volume</lii><br/>
            {this.props.volume}<br/>
            <lii>number</lii><br/>
            {this.props.number}<br/>
            <lii>pages</lii><br/>
            {this.props.pages}<br/>
            <lii>DOI</lii><br/>
            {this.props.DOI}
        </div>
    }
}