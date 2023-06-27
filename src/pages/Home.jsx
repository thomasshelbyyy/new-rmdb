import Banner from "../components/Banner"
import Footer from "../components/Footer"
import Header from "../components/Header"
import ListCard from "../components/ListCard"
import axios from "axios"
import { useEffect, useState } from "react"
import HomeSkeleton from "../components/HomeSkeleton"

const Home = ()=> {
    const apiKey = import.meta.env.VITE_API_KEY;
    const baseURL = import.meta.env.VITE_BASE_URL;
    const baseimageUrl = import.meta.env.VITE_BASE_IMAGE_URL;

    const [trending, setTrending] = useState('day')
    const [popular, setPopular] = useState('streaming')
    const [freeToWatch, setFreeToWatch] = useState('tv')

    const [trendingContent, setTrendingContent] = useState([])
    const [popularContent, setPopularContent] = useState([])
    const [freeToWatchContent, setFreeToWatchContent] = useState([])

    useEffect(()=> {
        window.scrollTo(0,0)
        document.title = "Rizky's Movie Database (RMDB)"
        const fetchTrending = async ()=> {
            try {
                const result = await axios.get(`${baseURL}/trending/all/${trending}?api_key=${apiKey}`)
                setTrendingContent(result.data.results)
                console.log(result.data.results)
            } catch(error) {
                console.log(error)
            }
        }

        fetchTrending()
    }, [trending])

    useEffect(()=> {
        if(popular === "streaming") {
            const fetchPopular = async ()=> {
                try {
                    const results = await axios.get(`${baseURL}/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&with_watch_providers=8`)
                    setPopularContent(results.data.results)
                } catch(error) {
                    console.log(error)
                }
            }

            fetchPopular()
        } else if(popular === "on-tv") {
            const fetchPopular = async ()=> {
                try {
                    const results = await axios.get(`${baseURL}/tv/popular?api_key=${apiKey}`)
                    setPopularContent(results.data.results)
                } catch (error) {
                    console.log(error)
                }
            }

            fetchPopular()
        } else if(popular === "for-rent") {
            const fetchPopular = async ()=> {
                try {
                    const results = await axios.get(`${baseURL}/discover/movie?api_key=${apiKey}&watch/providers=rent`)
                    setPopularContent(results.data.results)
                } catch(error) {
                    console.log(error)
                }
            }

            fetchPopular()
        } else if(popular === "in-theathers") {
            const fetchPopular = async ()=> {
                try {
                    const results = await axios.get(`${baseURL}/movie/now_playing?api_key=${apiKey}`)
                    setPopularContent(results.data.results)
                } catch(error) {
                    console.log(error)
                }
            }

            fetchPopular()
        }
    }, [popular])

    useEffect(()=> {
        const fetchContent = async ()=> {
            try {
                const results = await axios.get(`${baseURL}/discover/${freeToWatch}?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_watch_monetization_types=free&api_key=${apiKey}`)
                setFreeToWatchContent(results.data.results)
            } catch (error) {
                console.log(error)
            }
        }

        fetchContent()
    }, [freeToWatch])

    const toggleTrending = type => setTrending(type)
    const togglePopular = type => setPopular(type)
    const toggleFreeToWatch = type => setFreeToWatch(type)

    let popularContentComponent
    if(popularContent.length > 0) {
        popularContentComponent = popularContent.map(item => (
            <ListCard 
                title={popular === "on-tv" ? item.name : item.title}
                releaseDate={popular === "on-tv" ? item.first_air_date : item.release_date}
                id={item.id}
                poster={`${baseimageUrl}${item.poster_path}`}
                rating={item.vote_average.toFixed(1)}
                key={item.id}
                type={popular === "on-tv" ? "tv" : "movie"}
            />
        ))
    }


    const renderSkeleton = ()=> {
        const skeleton = []
        for(let i = 0; i < 10; i++) {
            skeleton.push(<HomeSkeleton key={i} />)
        }

        return skeleton
    }
    return(
        <div className="min-h-screen max-w-screen relative overflow-x-hidden">
            <Header />
            <Banner />
            <section className="w-full px-5 py-7">
                <h2 className="text-3xl py-4">Trending</h2>
                <div className="flex rounded-md border border-sky-700 w-fit">
                    <button onClick={()=> toggleTrending('day')} className={`${trending === "day" && "bg-sky-700"} hover:bg-sky-600 px-2 py-1`}>Today</button>
                    <button onClick={()=> toggleTrending('week')} className={`${trending === "week" && "bg-sky-700"} hover:bg-sky-600 px-2 py-1`}>This Week</button>
                </div>
                <div className="w-full h-fit flex overflow-x-scroll pt-7">
                    {trendingContent.length > 0 ? trendingContent.map(item => (
                        <ListCard
                            title={item.media_type === "movie" ? item.title : item.name}
                            releaseDate={item.media_type === "movie" ? item.release_date : item.first_air_date}
                            rating={item.vote_average.toFixed(1)}
                            poster={`${baseimageUrl}${item.poster_path}`}
                            key={item.id}
                            id={item.id}
                            type={item.media_type}
                        />
                    )) : renderSkeleton()}
                </div>
            </section>

            <section className="w-full px-5 py-7">
                <h2 className="text-3xl py-4">Popular</h2>
                <div className="flex rounded-md border border-sky-700 w-fit">
                    <button onClick={()=> togglePopular('streaming')} className={`${popular === "streaming" && "bg-sky-700"} hover:bg-sky-600 px-2 py-1`}>Streaming</button>
                    <button onClick={()=> togglePopular('on-tv')} className={`${popular === "on-tv" && "bg-sky-700"} hover:bg-sky-600 px-2 py-1`}>On TV</button>
                    <button onClick={()=> togglePopular('for-rent')} className={`${popular === "for-rent" && "bg-sky-700"} hover:bg-sky-600 px-2 py-1`}>For Rent</button>
                    <button onClick={()=> togglePopular('in-theater')} className={`${popular === "in-theater" && "bg-sky-700"} hover:bg-sky-600 px-2 py-1`}>In Theaters</button>
                </div>
                <div className="w-full h-fit flex overflow-x-scroll pt-7">
                    {popularContent.length > 0 ? popularContentComponent : renderSkeleton()}
                </div>
            </section>

            <section className="w-full px-5 py-7 pb-40">
                <h2 className="text-3xl py-4">Free To Watch</h2>
                <div className="flex rounded-md border border-sky-700 w-fit">
                    <button onClick={()=> toggleFreeToWatch('tv')} className={`${freeToWatch === "tv" && "bg-sky-700"} hover:bg-sky-600 px-2 py-1`}>Series</button>
                    <button onClick={()=> toggleFreeToWatch('movie')} className={`${freeToWatch === "movie" && "bg-sky-700"} hover:bg-sky-600 px-2 py-1`}>Movies</button>
                </div>
                <div className="w-full h-fit flex overflow-x-scroll pt-7">
                    {freeToWatchContent.length > 0 ? freeToWatchContent.map(item => (
                        <ListCard
                            title={freeToWatch === "movie" ? item.title : item.name}
                            releaseDate={freeToWatch === "movie" ? item.release_date : item.first_air_date}
                            rating={item.vote_average.toFixed(1)}
                            poster={`${baseimageUrl}${item.poster_path}`}
                            key={item.id}
                            id={item.id}
                            type={freeToWatch === "movie" ? "movie" : "tv"}
                        />
                    )) : renderSkeleton()}
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Home