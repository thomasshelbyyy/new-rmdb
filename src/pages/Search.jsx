import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import SearchCard from "../components/SearchCard";
import moment from "moment/moment";
import noImage from "../assets/no-image.png"
import SearchSkeleton from "../components/SearchSkeleton";
import Pagination from "../components/Pagination"

const Search = ()=>  {
    const location = useLocation()

    const apiKey = import.meta.env.VITE_API_KEY;
    const baseURL = import.meta.env.VITE_BASE_URL;
    const baseimageUrl = import.meta.env.VITE_BASE_IMAGE_URL;

    const [query, setQuery] = useState('')
    const [totalMovieResult, setTotalMovieResult] = useState()
    const [totalTvResult, setTotalTvResult] = useState()
    const [totalCollectionResult, setTotalCollectionResult] = useState()

    const [movieResult, setMovieResult] = useState([])
    const [totalMoviePages, setTotalMoviePages] = useState(0)
    
    const [tvResult, setTvResult] = useState([])
    const [totalTvPages, setTotalTvPages] = useState(0)

    const [collectionResult, setCollectionResult] = useState([])
    const [totalCollectionPages, setTotalCollectionPages] = useState(0)
    
    const [currentPage, setCurrentPage] = useState(1)

    const [activeSearch, setActiveSearch] = useState("movie")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=> {
        window.scrollTo(0,0)
        const searchParams = new URLSearchParams(location.search)
        const newQuery = searchParams.get('query')
        setQuery(newQuery)
        document.title = `${newQuery} search -- Rizky's Movie Database`

        const fetchData = async ()=> {
            setIsLoading(true)
            try {
                // Request for Movies
                const result1 = await axios.get(`${baseURL}/search/movie?query=${newQuery}&api_key=${apiKey}&page=${currentPage}`)
                console.log(result1)
                setTotalMovieResult(result1.data.total_results)
                setTotalMoviePages(result1.data.total_pages)
                setMovieResult(result1.data.results)

                // Request for TV
                const result2 = await axios.get(`${baseURL}/search/tv?query=${newQuery}&api_key=${apiKey}&page=${currentPage}`)
                console.log(result2)
                setTotalTvResult(result2.data.total_results)
                setTotalTvPages(result2.data.total_pages)
                setTvResult(result2.data.results)

                // Request for Collection
                const result3 = await axios.get(`${baseURL}/search/collection?query=${newQuery}&api_key=${apiKey}&page=${currentPage}`)
                console.log(result3)
                setTotalCollectionResult(result3.data.total_results)
                setTotalCollectionPages(result3.data.total_pages)
                setCollectionResult(result3.data.results)
            } catch(error) {
                console.log(error)
            }
            setIsLoading(false)
        }

        fetchData()
    }, [location.search, currentPage])


    const handleSearchChange = (type) => {
        setActiveSearch(type)
        setCurrentPage(1)
    }

    const handlePageChange = page => {
        setCurrentPage(page)
    }

    let searchResultComponent
    if(activeSearch === "movie") {
        if(movieResult.length > 0) {
            searchResultComponent =  movieResult.map(item => (
                <SearchCard 
                    key={item.id}
                    id={item.id}
                    type="movie"
                    title={item.title}
                    releaseDate={moment(item.release_date).format('D MMMM YYYY')}
                    overview={item.overview}
                    image={item.poster_path ? `${baseimageUrl}${item.poster_path}` : noImage}
                />
            ))
        } else {
            searchResultComponent = <p>Oops... no results found for <span className="font-bold">{query}</span> search in Movies</p>
        }
    } else if(activeSearch === "tv") {
        if(tvResult.length > 0) {
            searchResultComponent =  tvResult.map(item => (
                <SearchCard 
                    key={item.id}
                    id={item.id}
                    type="tv"
                    title={item.name}
                    releaseDate={moment(item.release_date).format('D MMMM YYYY')}
                    overview={item.overview}
                    image={item.poster_path ? `${baseimageUrl}${item.poster_path}` : noImage}
                />
            ))
        } else {
            searchResultComponent = <p>Oops... no results found for <span className="font-bold">{query}</span> search in Series</p>
        }
    } else {
        if(collectionResult.length > 0) {
            searchResultComponent =  collectionResult.map(item => (
                <SearchCard 
                    key={item.id}
                    id={item.id}
                    type="collection"
                    title={item.name}
                    releaseDate=""
                    overview={item.overview}
                    image={item.poster_path ? `${baseimageUrl}${item.poster_path}` : noImage}
                />
            ))
        } else {
            searchResultComponent = <p>Oops... no results found for <span className="font-bold">{query}</span> search in Collection</p>
        }
    }

    // To render 6 skeleton
    const skeleton = []
    for(let i = 0; i < 6; i++) {
        skeleton.push(i)
    }

    const skeletonComponent = skeleton.map(item => (
        <SearchSkeleton key={item} />
    ))

    return(
        <div className="min-h-screen max-w-screen relative overflow-x-hidden">
            <Header />
            <div className="pt-20 pb-6 px-8 flex flex-col md:flex-row justify-center items-center md:items-start gap-5">
                <div className="w-72 h-fit border border-white rounded-lg">
                    <div className="bg-sky-600 px-6 py-4 rounded-t-lg ">
                        <p className="text-2xl">Search Result</p>
                    </div>
                    <div className={`flex text-black justify-between px-4 py-2 ${activeSearch === "movie" ? "bg-slate-400" : "bg-slate-300"}`}>
                        <button onClick={()=> handleSearchChange("movie")}>Movies</button>
                        <span className=" text-sm rounded-full px-2 py-1 bg-sky-400 text-slate-800">{totalMovieResult}</span>
                    </div>
                    <div className={`flex text-black justify-between px-4 py-2 ${activeSearch === "tv" ? "bg-slate-400" : "bg-slate-300"}`}>
                        <button onClick={()=> handleSearchChange("tv")}>Series</button>
                        <span className=" text-sm rounded-full px-2 py-1 bg-sky-400 text-slate-800">{totalTvResult}</span>
                    </div>
                    <div className={`flex text-black justify-between px-4 py-2 rounded-b-lg ${activeSearch === "collection" ? "bg-slate-400" : "bg-slate-300"}`}>
                        <button onClick={()=> handleSearchChange("collection")}>Collections</button>
                        <span className=" text-sm rounded-full px-2 py-1 bg-sky-400 text-slate-800">{totalCollectionResult}</span>
                    </div>
                </div>
                <div className="w-9/12 flex flex-col">
                    <h1 className="text-2xl font-bold mb-5">Showing Result for '{query}'</h1>
                    {isLoading ? skeletonComponent : searchResultComponent}
                    {activeSearch === "movie" && movieResult.length > 0 && (
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalMoviePages}
                            handlePageChange={handlePageChange}
                        />
                    )}
                    {activeSearch === "tv" &&  tvResult.length > 0 && (
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalTvPages}
                            handlePageChange={handlePageChange}
                        />
                    )}
                    {activeSearch === "collection" &&  collectionResult.length > 0 &&(
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalCollectionPages}
                            handlePageChange={handlePageChange}
                        />
                    )}
                </div>
                
            </div>
            <div className="absolute bottom-0">

            <Footer />
            </div>
        </div>
    )
}

export default Search