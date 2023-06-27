import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { FaStar } from "react-icons/fa"
import axios from "axios"
import moment from "moment"
import ISO6391 from 'iso-639-1'
import Header from "../components/Header"
import Footer from "../components/Footer"
import DetailSkeleton from "../components/DetailSkeleton"
import CastCard from "../components/CastCard"
import CrewCard from "../components/CrewCard"
import CastSkeleton from "../components/CastSkeleton"
import CrewSkeleton from "../components/CrewSkeleton"
import noProfile from "../assets/no-profile.png"
import noImage from "../assets/no-image.png"
import RecommendationCard from "../components/RecommendationCard"

const SeriesDetail = ()=> {
    const {id} = useParams()
    const apiKey = import.meta.env.VITE_API_KEY;
    const baseURL = import.meta.env.VITE_BASE_URL;
    const baseimageUrl = import.meta.env.VITE_BASE_IMAGE_URL;

    const [series, setSeries] = useState({})
    const [recommendations, setRecommendations] = useState([])
    const [ageRating, setAgeRating] = useState('')
    const [cast, setCast] = useState([])
    const [showAllCast, setShowAllCast] = useState(false)
    const [crew, setCrew] = useState([])
    const [showAllCrew, setShowAllCrew] = useState(false)

    useEffect(()=> {
        window.scrollTo(0,0)
        document.title = `${series.name} Detail -- Rizky's Movie Database`
        const fetchData = async ()=> {
            try {
                // Request to get series detail
                const result = await axios.get(`${baseURL}/tv/${id}?api_key=${apiKey}`)
                setSeries(result.data)
                console.log(result.data)

                // Request to get rating
                const releaseDates = await axios.get(`${baseURL}/tv/${id}/content_ratings?api_key=${apiKey}`)
                const rating = releaseDates.data.results.find(item => item.iso_3166_1 === "US")
                if(rating) {
                    setAgeRating(rating.rating)
                }
                console.log(rating)

                // Request to get Credits Data
                const result2 = await axios.get(`${baseURL}/tv/${id}/credits?api_key=${apiKey}`)
                setCast(result2.data.cast)
                setCrew(result2.data.crew)
                console.log(result2)

                // Request to get recommendations
                const result3 = await axios.get(`${baseURL}/tv/${id}/recommendations?api_key=${apiKey}`)
                setRecommendations(result3.data.results)
                console.log(result3)

            } catch(error) {
                console.log(error)
            }
        }

        fetchData()
    }, [id])

    const backdropStyle = {
        backgroundImage: `url(${baseimageUrl}${series.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
    }

    // getting the genres
    const genres = []
    if(series.genres) {
        series.genres.map(genre => genres.push(genre.name))
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

    return(
        <div className="min-h-screen max-w-screen relative overflow-x-hidden">
            <Header />
            <div className="w-screen h-fit" style={series.backdrop_path ? backdropStyle : {margin: 0}}>
                <div>
                    {series.name ? (
                        <div className="bg-sky-800/40 h-full p-10 py-28 md:flex items-center">
                            <img src={`${baseimageUrl}${series.poster_path}`} alt={series.name} className="w-56 h-fit rounded-md" />
                            <div className="p-7">
                                <h1 className="text-3xl md:text-4xl font-medium">{series.name} <span className="font-light">({series.first_air_date && series.first_air_date.split('-')[0]})</span></h1>
                                <div className="my-4 text-lg md:flex ">
                                    <div>
                                        <span className="border border-white font-medium px-2 rounded-md mr-4">{ageRating ? ageRating : "Not Rated"}</span>
                                        {series && moment(series.first_air_date).format('D/MM/YYYY')}
                                    </div>
                                    <span className="hidden md:block mx-3">&#8226;</span>
                                    <span>{genres.join(', ')}</span>
                                </div>
                                <div className="flex items-center text-2xl">
                                    <FaStar className="text-yellow-400 pr-3 text-4xl" /> {series.vote_average.toFixed(1)}
                                </div>
                                <p className="italic text-xl">{series.tagline}</p>
                                <div >
                                    <p className="text-2xl">Overview</p>
                                    <p className="text-xl">{series.overview}</p>
                                </div>
                                <div className="flex flex-wrap py-6">
                                    {series.created_by.map(crew => (
                                        <div className="w-60 mb5" key={crew.id}>
                                            <p className="font-bold">{crew.name}</p>
                                            <p>Creator</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : <DetailSkeleton />}
                </div>
            </div>

            <div className="container mx-auto md:flex py-10 ">
                <div className="w-full">
                    <h1 className="pb-4 text-4xl font-bold">Cast</h1>
                    <div className="flex flex-wrap gap-4">
                        {cast.length > 0 ? visibleActor.map(item => (
                            <CastCard 
                                name={item.name}
                                key={item.id}
                                character={item.character}
                                image={item.profile_path ? `${baseimageUrl}/${item.profile_path}` : noProfile}
                            />
                        )) : (
                            <div className="flex flex-wrap gap-4">
                                <CastSkeleton />
                                <CastSkeleton />
                                <CastSkeleton />
                                <CastSkeleton />
                                <CastSkeleton />
                                <CastSkeleton />
                                <CastSkeleton />
                                <CastSkeleton />
                            </div>
                        )}
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
                        <p>{series.status}</p>
                    </div>
                    <div className="mb-3">
                        <p className="font-bold text-2xl">Network</p> <br />
                        {series.networks && <img src={`https://image.tmdb.org/t/p/w500${series.networks[0].logo_path}`} className="w-25" alt={series.networks[0].name} />}
                    </div>
                    <div className="mb-3">
                        <p className="font-bold text-2xl">Type</p>
                        <p>{series.type}</p>
                    </div>
                    <div className="mb-3">
                        <p className="font-bold text-2xl">Spoken Language</p>
                        <p>{ISO6391.getName(series.original_language)}</p>
                    </div>
                </div>
            </div>
            <hr className="md:hidden" />
            {series.seasons && (
                <div className="container pb-5 ml-4">
                    <h1 className="py-4 text-2xl font-bold">Latest Season</h1>
                    <div className="w-11/12 md:w-3/6 flex flex-col md:flex-row items-center p-3 border rounded-md border-slate-400">
                        <img src={series.seasons[series.seasons.length - 1].poster_path ? `${baseimageUrl}${series.seasons[series.seasons.length - 1].poster_path}` : noImage} alt={series.seasons[series.seasons.length - 1].name} className="w-40 rounded-md" />
                        <div className="pl-4">
                            <h2 className="font-semibold text-xl">{series.seasons[series.seasons.length - 1].name}</h2>
                            {series.seasons && (
                                <p className="text-lg">
                                    <span >{series.seasons[series.seasons.length -1].air_date && series.seasons[series.seasons.length -1].air_date.split('-')[0]} | {series.seasons[series.seasons.length - 1].episode_count} Episodes</span>
                                </p>
                            )}
                            <p>{series.seasons[series.seasons.length - 1].overview}</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="container pb-32 ml-16">
            {recommendations.length > 0 && (
                <div>
                    <p className="text-2xl font-bold">Recomendations</p>
                    <div className="w-9/12 flex gap-3 overflow-x-scroll overflow-y-hidden pt-7">
                        {recommendations.map(item => (
                            <RecommendationCard 
                                title={item.name}
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
            </div>
            <Footer />
        </div>
    )
}

export default SeriesDetail