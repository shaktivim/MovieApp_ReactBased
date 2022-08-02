import React, { Component } from 'react'
import {movies} from '../movieData'

export class Banner extends Component {
  render() {
    let ramdomNo = Math.floor(Math.random()*10)
    let bannerImg = `https://image.tmdb.org/t/p/original${movies.results[ramdomNo].backdrop_path}`
    // console.log(bannerImg)
    return (
        // getting card html from bootstrap
    <div className="card banner-card">
        <img className="card-img-top banner-img" src= {bannerImg} alt="..."/>
        <h5 className="card-title banner-title">{movies.results[ramdomNo].original_title}</h5>
        <p className="card-text banner-text">{movies.results[ramdomNo].overview}</p>
    </div>
    )
  }
}

export default Banner