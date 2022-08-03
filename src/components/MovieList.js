import React, { Component } from 'react'
// import {movies} from '../movieData'
import axios from 'axios'   // installed axios using npm install axios for making api request 
// axios works on promises so becomes asynchronous
// Before axios, js fetch method (it also works on promises) was there but there was backdraw
// fetch used to give data in json format, need to convert into string
// On importing axios, we call use all its method--> get, put, post, delete etc

export class MovieList extends Component {
  constructor(){
    super()

    console.log('In constructor')
    this.state = {
      hover : '',
      movies : [],
      parr : [1],
      currPage : 1,
      favorites :[]

    }
  }
  // 'componentDidMount' function runs only once in react sequencly after constructor and render functions
  // Async await always return promises which need to be resolved
  async componentDidMount(){
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=6e2315f3ada8c197ea1d83f9622c4bae&language=en-US&page=${this.state.currPage}`
    const res = await axios.get(url)
    // console.log(res)
    let movieDataFromApi = res.data
    this.setState({
      movies : [...movieDataFromApi.results]             // if change in state, re-render occurs
    })
    console.log('In componentdidMount')
  }

  changeMovies = async () => {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=6e2315f3ada8c197ea1d83f9622c4bae&language=en-US&page=${this.state.currPage}`
    const res = await axios.get(url)
    let movieDataFromApi = res.data
    this.setState({
      movies : [...movieDataFromApi.results]
    })
  }
  // After increment calling changeMovies functions
  handleNext = () => {
    let tempArr = []
    for(let i =1; i<=this.state.parr.length+1; i++){
      tempArr.push(i)
    }
    this.setState({
      parr : [...tempArr],
      currPage : this.state.currPage + 1
    }, this.changeMovies)
    // this.changeMovies()    //this not reload the contents in one click
  }

  handlePrev = () => {
    if(this.state.currPage != 1){
      this.setState({
        currPage : this.state.currPage - 1
      }, this.changeMovies)
    }
  }
  handlePageClick = (value)=>{
    console.log(value)
    if(this.state.currPage != value){
      this.setState({
        currPage : value
      }, this.changeMovies)
    }
  }

  handleFavorites =(movieObj) => {
    let data = JSON.parse(localStorage.getItem('favMovies') || '[]')
    // making add and remove features from favorite array
    if(this.state.favorites.includes(movieObj.id)){
      data = data.filter((movie)=>movie.id != movieObj.id)
    }else{
      data.push(movieObj)
    }
    localStorage.setItem('favMovies', JSON.stringify(data))
    this.handleFavoriteState() 
  }
  handleFavoriteState = () => {
    let data = JSON.parse(localStorage.getItem('favMovies') || '[]')
    let temp = data.map((movie) => movie.id)
    this.setState({
      favorites : [...temp]
    })
  }

  render() {
    // console.log('In render')
    // console.log(this.state.favorites)
    // we can write js in render function
    // let movies = movies.results
    // console.log(movieData)
    // this.changeMovies()    // changeMovies function can be called here as well and we can avoid using  'componentDidMount' function
    return (
        <>
            <div>
            <h1 className='text-center'><strong>Trending</strong></h1>
            </div>

            <div className='movies-list'>
                {this.state.movies.map((movieEle) =>(
                    <div className="card movie-card" onMouseEnter={()=>this.setState({hover: movieEle.id})} onMouseLeave={()=>this.setState({hover: ''})}>
                      {/* <img src={movie.poster_path} class="card-img-top" alt="..."/> */}
                      <img src={`https://image.tmdb.org/t/p/original${movieEle.poster_path}`} className="card-img-top movie-img" alt="..."/>
                      <h5 className="card-title movie-title">{movieEle.original_title}</h5>
                      {/* if condition is true it will display element after && */}
                      {this.state.hover == movieEle.id && <a onClick={()=>this.handleFavorites(movieEle)}
                         className="btn btn-primary movie-button">
                          {this.state.favorites.includes(movieEle.id) ? 'Remove from favorites' : 'Add to Favorites'}
                        </a>
                      }
                  </div>
                ))}
            </div>

            <div style={{display:'flex', justifyContent : 'center'}}>
              <nav aria-label="...">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" onClick={this.handlePrev}>Previous</a>
                  </li>
                  {this.state.parr.map((value)=>(
                    <li className="page-item"><a onClick={() => this.handlePageClick(value)} className="page-link">{value}</a></li>
                  ))}
                  <li className="page-item">
                    <a className="page-link" onClick={this.handleNext} >Next</a>
                  </li>
                </ul>
              </nav>
            </div>
            
        </>
    
    )
  }
}

export default MovieList