/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from 'react'
import NewsItem from './NewsItem'

import PropTypes from 'prop-types'

export class News extends Component {

     static defaultProps=
     {

         pageSize:5,
         country:"in",
         category:"sports"


     }
     static propTypes={
         pageSize: PropTypes.number,
         country: PropTypes.string,
         category: PropTypes.string
     }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title=`${this.props.category}`
    }
    async updatenews()
    {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=653a1f7e35334f349aac06c3dbb78f4a&page={this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults,loading:true });
    }
    handlePrevClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=653a1f7e35334f349aac06c3dbb78f4a&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // let data = await fetch(url);
        // let parsedData = await data.json();


        // this.setState(
        //     {
        //         page: this.state.page - 1,
        //         articles: parsedData.articles
        //     }
        // 
        this.setState({page:this.state.page-1});
        this.updatenews();

        
    }
    
    handleNextClick = async () => {
        // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/5))) {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=653a1f7e35334f349aac06c3dbb78f4a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            
        //     let data = await fetch(url);
        //     let parsedData = await data.json();

        //     this.setState(
        //         {
        //             page: this.state.page + 1,
        //             articles: parsedData.articles
        //         }
        //     )
        this.setState({page:this.state.page+1});
        this.updatenews();

        }

    
    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=653a1f7e35334f349aac06c3dbb78f4a&page=1&pageSize=${this.props.pageSize}`;
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults,loading:false })
        this.updatenews();
    }

    render() {

        return (
            <div className="container my-3">
                <h1 className="text-centre">NEWS-DAILYS TOP HEADLINES TODAY FROM {this.props.category}</h1>
                <div className="row" >
                    {
                        this.state.articles.map((element) => {
                            return <div className=" col-md-3" key={element.url}>

                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt}/>
                            </div>
                        })}
                    <div className="container  d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr;PREVIOUS</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/5)} type="button" className="btn btn-dark" onClick={this.handleNextClick}> NEXT &rarr; </button>
                    </div>
                </div>
            </div>

        )
    }
}


export default News
