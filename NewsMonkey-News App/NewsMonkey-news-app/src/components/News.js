import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import propTypes from 'prop-types'

export class News extends Component {
    static defaultProps ={
        country:"in",
        pageSize:6,
        category:'general'

    }
    static propTypes ={
        country:propTypes.string,
        pageSize:propTypes.number,
        category: propTypes.string

    }
    constructor(){ //runs for every news item
        super();
        console.log("hello")
        this.state={
            articles:[],
            loading:false,
            page:1,
        }
    }
    async componentDidMount(){ //runs after render
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=62dd6ad207bf45a29c52b9267fa8399e&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data=await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);
        this.setState({ articles: Array.isArray(parsedData.articles) ? parsedData.articles : [],totalResults:parsedData.totalResults,
            loading:false
        })

    } 
    handlePrevClick =async()=>{
        console.log("previous");
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=62dd6ad207bf45a29c52b9267fa8399e&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data=await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);
        this.setState({
            page:this.state.page-1 ,
             articles: Array.isArray(parsedData.articles) ? parsedData.articles : [],
             loading  : false
            })
        
    }

    handleNextClick =async()=>{
        console.log("next");
        if(this.state.page+1 >Math.ceil(this.state.totalResults/this.props.pageSize )){
        }
        else
       { let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=62dd6ad207bf45a29c52b9267fa8399e&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
       this.setState({loading:true});
        let data=await fetch(url);
        let parsedData=await data.json();
       
        this.setState({
            loading:false,
            page:this.state.page+1 ,
             articles: Array.isArray(parsedData.articles) ? parsedData.articles : [],}
            )}
       }

  render() {
    return (
      <div className='container my-4'>
        <h1 className="text-center" style={{margin:'23px 0px'}}>NewsMonkey-Top Headlines</h1>
       
        {this.state.loading&&<Spinner/>} 
  
<div className='row'>
{!this.state.loading && this.state.articles.map((element)=>{ //only if loading false show this
   return <div className='col-md-4' key={element.url}>
    <NewsItem  title={element.title? element.title.slice(0,40):"no title"} description={element.description ? element.description.slice(0,88) : "No description available"} 
     imageUrl={element.urlToImage}
    newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source} /> 
 </div>
 })}
          
        
        </div> 
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page+1 >Math.ceil(this.state.totalResults/this.props.pageSize

        )} type="button" className="btn btn-dark" onClick={this.handleNextClick}>  Next &rarr;</button>

        </div>
        </div>
      
    )
  }
}

export default News
//newsitem component child of news component
//only is loading true show spinner