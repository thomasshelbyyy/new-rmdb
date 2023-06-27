import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

const Header = () => {
  const navigate = useNavigate()

  const [searchOpen, setSearchOpen] = useState(false);
  const [movieDropdown, setMovieDropdown] = useState(false);
  const [seriesDropdown, setSeriesDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [searchInput, setSearchInput] = useState("")

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const toggleMovieDropdown = () => {
    setMovieDropdown(!movieDropdown);
    setSeriesDropdown(false)
  };

  const toggleSeriesDropdown = () => {
    setSeriesDropdown(!seriesDropdown);
    setMovieDropdown(false)
  };

  const toggleSidebar = ()=> {
    setIsOpen(prev => !prev)
  }

  const handleChange = event => {
    setSearchInput(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    setIsOpen(false)
    navigate(`/search?query=${searchInput}`)
  }

  return (
    <nav className="relative">
      <div>
        <div className="w-full bg-my-primary transition duration-300 flex justify-between items-center px-16 h-16 fixed">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="RMDB Logo" className="w-12" />
            <span className="font-bold text-xl">RMDB</span>
          </Link>
          <div className="hidden md:flex">
            <div className="relative inline-block text-left mx-4">
              <button
                type="button"
                onClick={toggleMovieDropdown}
                className="inline-flex justify-center w-full rounded-md text-white"
              >
                Movies
              </button>
              {movieDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <Link
                      onClick={()=> setMovieDropdown(false)}
                      to="/movie/popular"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                    >
                      Popular
                    </Link>
                    <Link
                      onClick={()=> setMovieDropdown(false)}
                      to="/movie/now_playing"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                    >
                      Now Playing
                    </Link>
                    <Link
                      onClick={()=> setMovieDropdown(false)}
                      to="/movie/upcoming"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                    >
                      Upcoming
                    </Link>
                    <Link
                      onClick={()=> setMovieDropdown(false)}
                      to="/movie/top_rated"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                    >
                      Top Rated
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="relative inline-block text-left mx-4">
              <button
                type="button"
                onClick={toggleSeriesDropdown}
                className="inline-flex justify-center w-full rounded-md text-white"
              >
                Series
              </button>
              {seriesDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <Link
                      onClick={()=> setSeriesDropdown(false)}
                      to="/tv/airing_today"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                    >
                      Airing Today
                    </Link>
                    <Link
                      onClick={()=> setSeriesDropdown(false)}
                      to="/tv/on_the_air"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                    >
                      On The Air
                    </Link>
                    <Link
                      onClick={()=> setSeriesDropdown(false)}
                      to="/tv/popular"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                    >
                      Popular
                    </Link>
                    <Link
                      onClick={()=> setSeriesDropdown(false)}
                      to="/tv/top_rated"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                    >
                      Top Rated
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <button onClick={toggleSearch} className="ml-4">
              <FaSearch />
            </button>
          </div>
          <button className="md:hidden text-2xl" onClick={toggleSidebar}>
                <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        {searchOpen && (
          <div className="w-full bg-white py-4 px-6 mt-16 fixed top-0 left-0 z-50">
              <form onSubmit={handleSubmit}>
                <div className="flex items-center">
                    <input
                      type="text"
                      className="w-full border-gray-300 bg-gray-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-my-primary text-slate-900"
                      placeholder="Search movies, series, or collections"
                      onChange={handleChange}
                      value={searchInput}
                    />
                    <button
                      className="ml-2 p-2 bg-my-primary rounded-md text-white"
                      type="submit"
                    >
                      <FaSearch />
                    </button>
                </div>
              </form>
          </div>
        )}
      </div>

      <div className={`h-full md:hidden pl-6 pt-10  transition duration-300 bg-my-primary w-40 top-0 left-0 fixed z-50 ${isOpen ? "translate-x-0" : "-translate-x-40"}`}>
        <Link to="/" className="flex items-center">
          <img src={logo} alt="RMDB Logo" className="w-12" />
          <span className="font-bold text-xl">RMDB</span>
        </Link>
        <form onSubmit={handleSubmit}>
          <div className="border border-white flex rounded-md bg-slate-400 my-2">
              <input 
              type="text" 
              className="w-28 bg-slate-400 placeholder:text-slate-950 pl-1 text-black" 
              placeholder="Search..."
              onChange={handleChange}
              value={searchInput}
              />
              <button className="border-l border-white px-1" type="submit"><FaSearch /></button>
          </div>
        </form>
        <p>Movies</p>
        <ul>
          <li className="ml-4">
            <Link to="/movie/popular">Popular</Link>
          </li>
          <li className="ml-4">
            <Link to="/movie/now_playing">Now Playing</Link>
          </li>
          <li className="ml-4">
            <Link to="/movie/upcoming">Upcoming</Link>
          </li>
          <li className="ml-4">
            <Link to="/movie/top_rated">Top Rated</Link>
          </li>
        </ul>
        <p>TV</p>
        <ul>
          <li className="ml-4">
            <Link to="/tv/airing_today">Airing Today</Link>
          </li>
          <li className="ml-4">
            <Link to="/tv/on_the_air">On The Air</Link>
          </li>
          <li className="ml-4">
            <Link to="/tv/popular">Popular</Link>
          </li>
          <li className="ml-4">
            <Link to="/tv/top_rated">Top Rated</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
