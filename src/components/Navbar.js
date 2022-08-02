import React, { Component } from 'react'
import {Link} from 'react-router-dom'

// Making components using classes
export class Navbar extends Component {
  render() {
    return (
      <div style={{display: 'flex'}}>
        <h1><Link to='/'>Movies App</Link></h1>
        <h2 style={{marginLeft: '2rem', marginTop:'0.5rem'}} ><Link to='favorites'>Favourites</Link></h2>
      </div>
    )
  }
}

export default Navbar