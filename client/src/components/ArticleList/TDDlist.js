import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import BetterScroll from 'better-scroll';
// import ArticleCard from './ArticleCard';

export default class TDDlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
        articles: [],
        backarticles: [],
        list:[],

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
            <div>
                <div>
                    {/* <input onInput={this.handleInput}/> */}
                    <div className="list" style={{height:'415px',width:"480px",backgroundColor:'#b5b5b5',overflow:'hidden'}}>
                            {/* {articleList} */}
                            <div className="content">
                            <input onInput={this.handleInput} onChange={(evt)=>{
                                    this.setState({
                                        text:evt.target.value
                                    })
                                }}/>
                                <button className="add" onClick={()=>{
                                    this.setState({
                                        list:[...this.state.list,this.state.text]
                                    })
                                }}>add</button>
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
                    <div className="searchhistory">
                                    <ul>
                                        {
                                            this.state.list.map( (item,index)=>
                                            <li key={item}>{item}
                                            <button className="del" onClick={()=>{
                                                var newlist = [...this.state.list]
                                                newlist.splice(index,1)
                                                this.setState({
                                                    list:newlist
                                                })
                                            }}>del</button>
                                            </li>    
                                            )
                                        }
                                    </ul>
                                </div>
                {/* <div>---</div> */}
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

// export default TDDlist;

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
            <df>title</df><br/>
            {this.props.title}<br/>
            <df>author</df><br/>
            {this.props.author}<br/>
            <df>journal_name</df><br/>
            {this.props.journal_name}<br/>
            <df>published_date</df><br/>
            {this.props.published_date}<br/>
            <df>volume</df><br/>
            {this.props.volume}<br/>
            <df>number</df><br/>
            {this.props.number}<br/>
            <df>pages</df><br/>
            {this.props.pages}<br/>
            <df>DOI</df><br/>
            {this.props.DOI}
        </div>
    }
}