import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import SeriesDetail from './pages/SeriesDetail'
import MovieList from './pages/MovieList'
import SeriesList from './pages/SeriesList'
import Collection from './pages/Collection'
import Search from './pages/Search'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/detail/movie/:id' element={<MovieDetail />} />
          <Route path='/movie/:type' element={<MovieList />} />
          <Route path='/detail/tv/:id' element={<SeriesDetail />} />
          <Route path='/tv/:type' element={<SeriesList />} />
          <Route path='/detail/collection/:id' element={<Collection />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
