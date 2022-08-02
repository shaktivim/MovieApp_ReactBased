
import './App.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import MovieList from './components/MovieList';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Favorites from './components/Favorites';

function App() {
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' 
            element ={
              <>
                <Banner/>
                <MovieList/>
              </>
            } 
          />
          <Route path='/favorites' 
            element ={
              <Favorites/>
            } 
          />
        </Routes>
    </BrowserRouter>
    // To show Favorites component on different page, router is installed which is a npm package
    // For using routes, we need to put all the components in BrowserRouter tag
    // For components which are common(eg Navbar) to all pages, need to be put outside router component
    // Now, components inside Routes tag can be manipulated to different pages with routing
    // React is actually a single page application (only components re-render), not multi-page
    // Using anchor tag makes page  reload(which is timetaking) and take on another page 
    // React router dom gives a component tag called Link
  );
}

export default App;
