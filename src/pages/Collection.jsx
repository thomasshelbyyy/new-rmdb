import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import noProfile from "../assets/no-profile.png"
import noImage from "../assets/no-image.png"
import CastCard from "../components/CastCard";
import CastSkeleton from "../components/CastSkeleton";
import CrewCard from "../components/CrewCard";
import CrewSkeleton from "../components/CrewSkeleton";
import CollectionMoviesCard from "../components/CollectionMoviesCard";
import Header from "../components/Header"
import Footer from "../components/Footer"
import DetailSkeleton from "../components/DetailSkeleton"
import { FaStar } from "react-icons/fa"

const Collection = ()=> {
    const {id} = useParams()

    const apiKey = import.meta.env.VITE_API_KEY;
    const baseURL = import.meta.env.VITE_BASE_URL;
    const baseimageUrl = import.meta.env.VITE_BASE_IMAGE_URL;

    const [collection, setCollection] = useState({})
    const [actors, setActors] = useState([])
    const [crew, setCrew] = useState([])
    const [genres, setGenres] = useState([])
    const [revenue, setRevenue] = useState()
    const [voteAverage, setVoteAverage] = useState()

    useEffect(()=> {
        window.scrollTo(0,0)
        document.title = `${collection.name} -- Rizky's Movie Database (RMDB)`
        const fetchData = async ()=> {
            try {
                const result = await axios.get(`${baseURL}/collection/${id}?api_key=${apiKey}`)
                setCollection(result.data)

                // Request To get popular actor and crew
                const castRequestData = []
                const crewRequestData = []
                const movieRevenue = []
                const genres = []
                const votes = []

                await Promise.all(
                    result.data.parts.map(async (item) => {
                        const creditRequest = await axios.get(`${baseURL}/movie/${item.id}/credits?api_key=${apiKey}`)

                        // To get popular actor
                        const popularActor = creditRequest.data.cast.filter(item => item.popularity > 30.000)
                        popularActor.map(actor => castRequestData.push(actor))

                        // To get Director and writer from crew
                        // console.log(creditRequest.data.crew)
                        const crew = creditRequest.data.crew.filter(item => item.job === "Director" || item.job === "Writer")
                        crew.map(item => crewRequestData.push(item))
                        
                        // Request to get total revenue and genre and vote average
                        const moviesResult = await axios.get(`${baseURL}/movie/${item.id}?api_key=${apiKey}`)
                        moviesResult.data.genres.map(item => genres.push(item))
                        movieRevenue.push(moviesResult.data.revenue)
                        votes.push(moviesResult.data.vote_average)
                    })
                )

                const uniqueCastItems = castRequestData.reduce((result, item) => {
                    if(!result.find((i) => i.id === item.id)) {
                        result.push(item)
                    }
                    return result
                }, [])

                const uniqueCrewItems = crewRequestData.reduce((result, item) => {
                    if(!result.find((i) => i.id === item.id)) {
                        result.push(item)
                    }
                    return result
                }, [])

                const uniqueGenres = genres.reduce((result, item) => {
                    if(!result.find((i) => i.id === item.id)) {
                        result.push(item)
                    }
                    return result
                }, [])
                console.log(uniqueGenres)


                const total = movieRevenue.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue
                }, 0)

                const totalVotes = votes.reduce((acc, curr) => {
                    return acc + curr
                }, 0)

                setActors(uniqueCastItems)
                setCrew(uniqueCrewItems)
                setGenres(uniqueGenres)
                setRevenue(total)
                setVoteAverage(totalVotes / votes.length)
            } catch(error) {
                console.log(error)
            }
        }

        fetchData()
    }, [id])

    const backdropStyle = {
        backgroundImage: `url(${baseimageUrl}${collection.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
    }

    const options = {
        style: 'decimal',
        useGrouping: true,
        minimumFractionDigits: 2,
    };

    return(
        <div className="min-h-screen max-w-screen relative overflow-x-hidden">
            <Header />
            <div className="w-screen h-fit" style={collection.backdrop_path ? backdropStyle : {margin: 0}}>
                <div>
                {collection.name ? (
                    <div  className="bg-sky-800/40 h-full p-10 py-28 md:flex items-center">
                        <img src={`${baseimageUrl}${collection.poster_path}`} alt={collection.name} className="w-56 h-fit rounded-md" />
                        <div className="p-7">
                            <h1 className="text-3xl md:text-4xl font-medium">{collection.name}</h1>
                            <h2 className="text-xl">
                                {genres.map((genre, index) => (
                                    <span key={genre.id}>
                                        {genre.name}
                                        {index !== genres.length - 1 && ", "}
                                    </span>
                                ))}
                            </h2>
                            <div className="flex items-center text-2xl">
                                <FaStar className="text-yellow-400 pr-3 text-4xl" /> {voteAverage && voteAverage.toFixed(1)}
                            </div>
                            <div >
                                <p className="text-2xl">Overview</p>
                                <p className="text-xl">{collection.overview}</p>
                            </div>
                            <p><span className="font-bold">Total Movies: </span>{collection.parts.length}</p>
                            <p><span className="font-bold">Total Revenue: </span>${revenue && revenue.toLocaleString('en-US', options)}</p>
                        </div>
                    </div>
                ) : <DetailSkeleton />}
                </div>

            </div>
            <div className="container mx-auto md:flex py-14 ">
                <div className="w-full">
                    <h1 className="pb-4 text-4xl font-bold">Cast</h1>
                    <div className="flex flex-wrap gap-4 pb-3">
                        {actors.length > 0  ? actors.map(item => (
                            <CastCard
                                name={item.name}
                                character={item.character}
                                image={item.profile_path ? `${baseimageUrl}/${item.profile_path}` : noProfile}
                                key={item.id}
                            />
                        )) : (
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
                        )}
                    </div>
                    <hr />
                    <h1 className="py-4 text-4xl font-bold">Crew</h1>
                    <div className="flex flex-wrap gap-4 pb-3">
                        {crew.length > 0 ? crew.map(item => (
                            <CrewCard 
                                key={item.credit_id}
                                name={item.name}
                                job={item.job}
                            />
                        )) : (
                            <>
                                <CrewSkeleton />
                                <CrewSkeleton />
                                <CrewSkeleton />
                                <CrewSkeleton />
                                <CrewSkeleton />
                                <CrewSkeleton />
                                <CrewSkeleton />
                                <CrewSkeleton />
                            </>
                        )}
                    </div>
                    <hr />
                </div>
            </div>
            <div className="w-screen ">
                {collection.parts && collection.parts.map(item => (
                    <CollectionMoviesCard 
                        title={item.title}
                        key={item.id}
                        id={item.id}
                        image={item.poster_path ? `${baseimageUrl}${item.poster_path}` : noImage}
                        releaseDate={item.release_date}
                        overview={item.overview}
                    />
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default Collection