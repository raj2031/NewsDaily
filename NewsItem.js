import React, { Component } from 'react'


export class NewsItem extends Component {


  render() {
    let {title, description,imageurl ,newsurl,author,date} = this.props;
    return (
      <div>
        <div className="card" >
          <img src={!imageurl?"https://c.ndtvimg.com/2022-01/qo2m54es_sulli-deals-creator_625x300_09_January_22.jpg":imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">{author?"author":"unknown"} on {new Date (date).toGMTString()}</small></p>
            <a href={newsurl} rel="noreferrer " target="_blank" className="btn btn-sm btn-dark">Read more</a>
          </div>
         
        </div>
      </div>
    )
  }
}

export default NewsItem

