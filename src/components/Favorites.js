import React, { Component } from 'react'
// import { movies } from '../movieData';
// import { movies } from '../movieData'


export class Favorites extends Component {
  constructor(){
    super()
    this.state ={
      genres: ['All Genre', 'Action', 'Comdey', 'Romance'],
      movies : [],
      currGenre : 'All Genre',
      currText : '',
    }
  }
  componentDidMount(){
    let genreids = { 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV", 53: "Thriller", 10752: "War", 37: "Western", };
    let data = JSON.parse(localStorage.getItem('favMovies') || '[]')
    let tempArr = []
    //making geners array from favMovies
    data.map((movieObj)=>{
      if(!tempArr.includes(genreids[movieObj.genre_ids[0]])){
        tempArr.push(genreids[movieObj.genre_ids[0]])
      }
    })
    this.setState({
      movies : [...data],
      genres : ['All Genre', ...tempArr]
    })
  }

  changeGenre = (genre) =>{
    this.setState({
      currGenre : genre
    })
  }

  sortByPopularity = (val)=>{
    let temp = this.state.movies
    temp.sort(function(ObjA, ObjB){
      if(val == 1){
        return ObjB.popularity - ObjA.popularity
      }else{
        return ObjA.popularity - ObjB.popularity
      }
    })
    this.setState({
      movies :[...temp]
    })
  }

  sortByRating = (val)=>{
    let temp = this.state.movies
    temp.sort(function(ObjA, ObjB){
      if(val == 1){
        return ObjB.vote_average - ObjA.vote_average
      }else{
        return ObjA.vote_average - ObjB.vote_average
      }
    })
    this.setState({
      movies :[...temp]
    })
  }

  handleFavMovieDlt =(id)=>{
    let temp = this.state.movies
    temp = temp.filter((movieObj)=>{
      return movieObj.id != id
    })
    localStorage.setItem('favMovies', JSON.stringify(temp))
    this.setState({
      movies : [...temp]
    })
  }

  render() {
    let genreids = { 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV", 53: "Thriller", 10752: "War", 37: "Western", };
    // let movieData = movies.results
    let filterArr = []
    filterArr = [...this.state.movies]
    if(this.state.currGenre != 'All Genre'){
      filterArr = filterArr.filter((movieObj) => genreids[movieObj.genre_ids[0]] == this.state.currGenre)
    }
    if(this.state.currText !== ''){
      filterArr = filterArr.filter((movieObj)=>{
          let title = movieObj.title.toLowerCase()
          return title.includes(this.state.currText.toLowerCase())
      })
    }

    return (
      <div className='main'>
        <div className='row'>
          <div className='col-3'>
            <ul className="list-group genre-selector">
              {this.state.genres.map((genre) => this.state.currGenre == genre ? 
              (<li className="list-group-item" style={{background:'#3f51b5', color:'white', fontWeight:'bold', cursor:'pointer'}} >{genre}</li>) : 
              (<li onClick={() => this.changeGenre(genre)} className="list-group-item" style={{background:'white', color:'#3f51b5', fontWeight:'bold', cursor:'pointer'}} >{genre}</li>)
              )}
            </ul>
          </div>
          <div className='col-9 favorites-table'>
            <div className='row'>
                <input type='text'placeholder='Search'
                value={this.state.currText} onChange ={(e)=>this.setState({currText:e.target.value})}
                className='input-group-text col' />
                <input type='number' className='input-group-text col'/>
            </div>
            <div className='row'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th></th>
                    <th scope="col">Genre</th>
                    <th scope="col"><i className="fa-solid fa-sort-up" onClick={()=>this.sortByPopularity(1)}></i>Popularity<i className="fa-solid fa-sort-down" onClick={()=>this.sortByPopularity(-1)}></i></th>
                    <th scope="col"><i className="fa-solid fa-sort-up" onClick={()=>this.sortByRating(1)}></i>Ratings<i className="fa-solid fa-sort-down" onClick={()=>this.sortByRating(-1)}></i></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filterArr.map((movie) => (
                    <tr>
                      <td>
                        <img style={{width:'6rem'}} src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt=''/>
                      </td>
                      <th scope="row">{movie.title}</th>
                      {/* <td>genre</td> */}
                      <td>{genreids[movie.genre_ids[0]]}</td>
                      <td>{movie.popularity}</td>
                      <td>{movie.vote_average}</td>
                      <td><button onClick={()=>this.handleFavMovieDlt(movie.id)} type="button" className="btn btn-danger">Remove</button></td>
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