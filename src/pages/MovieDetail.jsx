import axios from "axios"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import moment from "moment"
import { FaStar } from "react-icons/fa"
import DetailSkeleton from "../components/DetailSkeleton"
import CastSkeleton from "../components/CastSkeleton"
import CastCard from "../components/CastCard"
import CrewSkeleton from "../components/CrewSkeleton"
import CrewCard from "../components/CrewCard"
import ISO6391 from 'iso-639-1';
import RecommendationCard from "../components/RecommendationCard"
import noImage from "../assets/no-image.png"
import noProfile from "../assets/no-profile.png"

const MovieDetail = ()=> {
    const {id} = useParams()
    const apiKey = import.meta.env.VITE_API_KEY;
    const baseURL = import.meta.env.VITE_BASE_URL;
    const baseimageUrl = import.meta.env.VITE_BASE_IMAGE_URL;

    const [movie, setMovie] = useState({})
    const [recommendations, setRecommendations] = useState([])
    const [rating, setRating] = useState('')
    const [cast, setCast] = useState([])
    const [showAllCast, setShowAllCast] = useState(false)
    const [crew, setCrew] = useState([])
    const [showAllCrew, setShowAllCrew] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=> {
        window.scrollTo(0,0)
        document.title = `${movie.title} Detail -- Rizky's Movie Database`
        const fetchData = async ()=> {
            setIsLoading(true)
            try {
                // Request to get movie detail
                const result = await axios.get(`${baseURL}/movie/${id}?api_key=${apiKey}`)
                setMovie(result.data)

                // Request to get rating
                const releaseDates = await axios.get(`${baseURL}/movie/${id}/release_dates?api_key=${apiKey}`)
                const result2 = releaseDates.data.results
                const usRelease = result2.find(item => item.iso_3166_1 === 'US')
                if(usRelease) {
                    setRating(usRelease.release_dates[0].certification)
                }

                // Request to get credits data
                const result3 = await axios.get(`${baseURL}/movie/${id}/credits?api_key=${apiKey}`)
                setCast(result3.data.cast)
                setCrew(result3.data.crew)

                // Request to get recommendations
                const result4 = await axios.get(`${baseURL}/movie/${id}/recommendations?api_key=${apiKey}`)
                setRecommendations(result4.data.results)
                
            } catch(error) {
                console.log(error)
            }
            setIsLoading(false)
        }

        fetchData()
    }, [id])

    const backdropStyle = {
        backgroundImage: `url(${baseimageUrl}${movie.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
    }

    let collectionBackdropStyle = {}
    if(movie.belongs_to_collection) {
        collectionBackdropStyle = {...backdropStyle, backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.belongs_to_collection.backdrop_path})`}
    }

    // getting the genres
    const genres = []
    let hours
    let minutes
    if(movie.genres) {
        movie.genres.map(genre => genres.push(genre.name))
        hours = Math.floor(movie.runtime / 60)
        minutes = movie.runtime % 60
    }

    // getting the main crew
    let mainCrew = []
    if(crew.length > 0) {
        mainCrew = crew.filter(item => item.job === "Director" || item.job === "Writer" || item.job === "Characters")
    }

    // Getting visible actor
    const actorLimit = showAllCast ? cast.length : 8;
    let visibleActor
    if(cast.length > 0) {
        visibleActor = cast.slice(0, actorLimit)
    }

    // Getting visible crew
    const crewLimit = showAllCrew ? crew.length : 8;
    let visibleCrew
    if(crew.length > 0) {
        visibleCrew = crew.slice(0, crewLimit)
    }
    
        // For money configuration
    const options = {
        style: 'decimal',
        useGrouping: true,
        minimumFractionDigits: 2,
    };

    return(
        <div className="min-h-screen max-w-screen relative overflow-x-hidden">
            <Header />
            <div className="w-screen h-fit" style={movie.backdrop_path ? backdropStyle : {margin: 0}}>
                <div>
                {isLoading ? <DetailSkeleton /> : movie.title && (
                    <div  className="bg-sky-800/40 h-full p-10 py-28 md:flex items-center">
                    <img src={`${baseimageUrl}${movie.poster_path}`} alt={movie.title} className="w-56 h-fit rounded-md" />
                    <div className="p-7">
                        <h1 className="text-3xl md:text-4xl font-medium">{movie.title} <span className="font-light">({movie.release_date && movie.release_date.split('-')[0]})</span></h1>
                        <div className="my-4 text-lg md:flex ">
                            <div>
                                <span className="border border-white font-medium px-2 rounded-md mr-4">{rating ? rating : "Not Rated"}</span>
                                {movie && moment(movie.release_date).format('D/MM/YYYY')}
                            </div>
                            <span className="hidden md:block mx-3">&#8226;</span>
                            <span>{genres.join(', ')}</span>
                            <span className="hidden md:block mx-3" >&#8226;</span>
                            <p>{`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}</p>
                        </div>
                        <div className="flex items-center text-2xl">
                            <FaStar className="text-yellow-400 pr-3 text-4xl" /> {movie.vote_average.toFixed(1)}
                        </div>
                        <p className="italic text-xl">{movie.tagline}</p>
                        <div >
                            <p className="text-2xl">Overview</p>
                            <p className="text-xl">{movie.overview}</p>
                        </div>
                        <div className="flex flex-between flex-wrap py-6">
                            {crew.length > 0 && (
                                mainCrew.length > 0 && mainCrew.map(item => (
                                    <div key={item.id} className="w-60 mb-5">
                                        <p className="font-bold">{item.name}</p>
                                        <p>{item.job}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                )}
                </div>

            </div>
            <div className="container mx-auto md:flex py-14 ">
                <div className="w-full">
                    <h1 className="pb-4 text-4xl font-bold">Cast</h1>
                    <div className="flex flex-wrap gap-4">
                        {isLoading ? (
                            <>
                                <CastSkeleton />
                                <CastSkeleton />
                                <CastSkeleton />
                                <CastSkeleton />
                                <CastSkeleton />
                                <CastSkeleton />
                                <CastSkeleton />
                                <CastSkeleton />
                            </>
                        ) : cast.length > 0 ? visibleActor.map(item => (
                            <CastCard 
                                name={item.name}
                                character={item.character}
                                image={item.profile_path ? `${baseimageUrl}/${item.profile_path}` : noProfile}
                                key={item.id}
                            />
                        )) : <p>No Actors Found</p>}
                    </div>
                    <button className="rounded-md px-4 py-2 my-3 bg-sky-600 hover:bg-sky-700" onClick={()=> setShowAllCast(prev => !prev)}>{showAllCast ? "Show Less" : "Show More"}</button>
                    <hr />
                    <h1 className="py-4 text-4xl font-bold">Crew</h1>
                    <div className="flex flex-wrap gap-4">
                        {crew.length > 0 ? visibleCrew.map(item => (
                            <CrewCard 
                                key={item.credit_id}
                                name={item.name}
                                job={item.job}
                            />
                        )) : (
                            <div className="flex flex-wrap gap-4">

                                <CrewSkeleton />
                                <CrewSkeleton />
                                <CrewSkeleton />
                                <CrewSkeleton />
                                <CrewSkeleton />
                                <CrewSkeleton />
                                <CrewSkeleton />
                                <CrewSkeleton />
                            </div>
                        )}
                    </div>
                    <button className="rounded-md px-4 py-2 my-3 bg-sky-600 hover:bg-sky-700" onClick={()=> setShowAllCrew(prev => !prev)}>{showAllCrew ? "Hide Some" : "Show All"}</button>
                    <hr />
                </div>
                <div className="w-72">
                    <div className="mb-3">
                        <p className="font-bold text-2xl">Status</p>
                        <p>{movie.status}</p>
                    </div>
                    <div className="mb-3">
                        <p className="font-bold text-2xl">Spoken Language</p>
                        <p>{ISO6391.getName(movie.original_language)}</p>
                    </div>
                    <div className="mb-3">
                        <p className="font-bold text-2xl">Budget</p>
                        <p>${movie.title && movie.budget.toLocaleString('en-US', options)}</p>
                    </div>
                    <div className="mb-3">
                        <p className="font-bold text-2xl">Revenue</p>
                        <p>${movie.title && movie.revenue.toLocaleString('en-US', options)}</p>
                    </div>
                </div>
            </div>
            <hr className="md:hidden" />
            <div className="container py-10 ">
                {movie.belongs_to_collection && (
                    <div style={collectionBackdropStyle} className="w-4/6 h-32 ml-16 rounded-lg">
                        <div className="w-full h-full bg-my-primary/40 flex flex-col justify-center items-center  text-center rounded-lg">
                            <p className="text-xl pb-3">This Movie is part to {movie.belongs_to_collection.name}</p>
                            <Link to={`/detail/collection/${movie.belongs_to_collection.id}`} className="rounded-full px-3 py-2 bg-sky-400 hover:bg-sky-500">Visit Collection</Link>
                        </div>
                    </div>
                )}
            </div>
            {recommendations.length > 0 && (
                <div className="container pb-32 ml-16">
                    <p className="text-2xl font-bold">Recomendations</p>
                    <div className="w-9/12 flex gap-3 overflow-x-scroll overflow-y-hidden pt-7">
                        {recommendations.map(item => (
                            <RecommendationCard 
                                title={item.title}
                                image={item.backdrop_path ? `${baseimageUrl}${item.backdrop_path}` : noImage}
                                key={item.id}
                                id={item.id}
                                rating={item.vote_average.toFixed(1)}
                                type={item.media_type}
                            />
                        ))}
                    </div>
                </div>
            )}
            <Footer />
        </div>
    )
}

export default MovieDetail