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
        source:'',
        published_date:'',
        claim:'',
        evidence:'',
        status:'',
        DOI:'',
        types:''
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
                                                title:value
                                            })
                                        }}
                                        onEvent2={(value)=>{
                                            // console.log("CtoP",value)
                                            this.setState({
                                                author:value
                                            })
                                        }}
                                        onEvent3={(value)=>{
                                            // console.log("CtoP",value)
                                            this.setState({
                                                source:value
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
                                                claim:value
                                            })
                                        }}
                                        onEvent6={(value)=>{
                                            // console.log("CtoP",value)
                                            this.setState({
                                                evidence:value
                                            })
                                        }}
                                        onEvent7={(value)=>{
                                            // console.log("CtoP",value)
                                            this.setState({
                                                status:value
                                            })
                                        }}
                                        onEvent8={(value)=>{
                                            // console.log("CtoP",value)
                                            this.setState({
                                                DOI:value
                                            })
                                        }}onEvent9={(value)=>{
                                            // console.log("CtoP",value)
                                            this.setState({
                                                types:value
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
                    status={this.state.status}
                    source={this.state.source}
                    published_date={this.state.published_date}
                    claim={this.state.claim}
                    evidence={this.state.evidence}
                    title={this.state.title}
                    types={this.state.types}
                    author={this.state.author}>
                    </FilmDetail>
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
                                            }}>delete</button>
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

    var newList = this.state.backarticles.filter(item=>
       item.title.toUpperCase().includes(event.target.value.toUpperCase())
    || item.author.toUpperCase().includes(event.target.value.toUpperCase())
    // || item.source.toUpperCase().includes(event.target.value.toUpperCase())
    || item.published_date.toUpperCase().includes(event.target.value.toUpperCase())
    // || item.claim.toUpperCase().includes(event.target.value.toUpperCase())
    // || item.evidence.toUpperCase().includes(event.target.value.toUpperCase())
    // || item.status.toUpperCase().includes(event.target.value.toUpperCase())
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
        let {title,author,DOI,source,claim,published_date,evidence,status,types} = this.props
        return(
            <div className="articleitem" onClick={()=>{
                // console.log(value)
                this.props.onEvent(title)
                this.props.onEvent2(author)
                this.props.onEvent3(source)
                this.props.onEvent4(published_date)
                this.props.onEvent5(claim)
                this.props.onEvent6(evidence)
                this.props.onEvent7(status)
                this.props.onEvent8(DOI)
                this.props.onEvent9(types)
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
            <df>source</df><br/>
            {this.props.source}<br/>
            <df>published_date</df><br/>
            {this.props.published_date}<br/>
            <df>claim</df><br/>
            {this.props.claim}<br/>
            <df>evidence</df><br/>
            {this.props.evidence}<br/>
            <df>status</df><br/>
            {this.props.status}<br/>
            <df>DOI</df><br/>
            {this.props.DOI}<br/>
            <df>types</df><br/>
            {this.props.types}
        </div>
    }
}