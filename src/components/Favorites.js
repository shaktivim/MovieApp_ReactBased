import React, { Component } from 'react'
import { movies } from '../movieData'


export class Favorites extends Component {
  constructor(){
    super()
    this.state ={
      genres: ['All Movies', 'Action', 'Comdey', 'Romance']
    }
  }

  render() {
    let movieData = movies.results
    let genreids = { 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV", 53: "Thriller", 10752: "War", 37: "Western", };
    return (
      <div className='main'>
        <div className='row'>
          <div className='col-3'>
            <ul className="list-group genre-selector">
              {this.state.genres.map((genre) =>(
                <li className="list-group-item" style={{background:'white', color:'#3f51b5', fontWeight:'bold'}} >{genre}</li>
              ))}
            </ul>
          </div>
          <div className='col-9 favorites-table'>
            <div className='row'>
                <input type='text'placeholder='Search' className='input-group-text col' />
                <input type='number' className='input-group-text col'/>
            </div>
            <div className='row'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th></th>
                    <th scope="col">Genre</th>
                    <th scope="col">Popularity</th>
                    <th scope="col">Ratings</th>
                  </tr>
                </thead>
                <tbody>
                  {movieData.map((movie) => (
                    <tr>
                      <td>
                        <img style={{width:'6rem'}} src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} />
                      </td>
                      <th scope="row">{movie.title}</th>
                      <td>{genreids[movie.genre_ids[0]]}</td>
                      <td>{movie.popularity}</td>
                      <td>{movie.vote_average}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Favorites