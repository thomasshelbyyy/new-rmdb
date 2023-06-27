import { useParams, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import HomeSkeleton from "../components/HomeSkeleton"
import noImage from "../assets/no-image.png"
import Pagination from "../components/Pagination"
import ListCard from "../components/ListCard"

const SeriesList = ()=> {
    const navigate = useNavigate()
    const {type} = useParams()
    const apiKey = import.meta.env.VITE_API_KEY;
    const baseURL = import.meta.env.VITE_BASE_URL;
    const baseimageUrl = import.meta.env.VITE_BASE_IMAGE_URL;

    const [series, setSeries] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const [isLoading, setIsLoading] = useState(false)

    // to handle when current page change
    useEffect(()=> {
        window.scrollTo(0,0)
        switch (type) {
            case "popular":
                document.title = "Popular TV Shows -- Rizky's Movie Database"
                break;
            case "airing_today":
                document.title = "Airing Today TV Shows -- Rizky's Movie Database"
                break;
            case "on_the_air":
                document.title = "On The Air TV Shows -- Rizky's Movie Database"
                break;
            case "top_rated":
                document.title = "Top Rated TV Shows -- Rizky's Movie Database"
                break;
            default:
                break;
        }
        const fetchData = async ()=> {
            setIsLoading(true)
            try {
                const results = await axios.get(`${baseURL}/tv/${type}?api_key=${apiKey}&page=${currentPage}`)
                setSeries(results.data.results)
                setTotalPages(results.data.total_pages)
            } catch(error) {
                console.log(error)
            }
            setIsLoading(false)
        }

        fetchData()
        navigate(`/tv/${type}?page=${currentPage}`)
    }, [currentPage])

    // to handle cange wheb only query change
    useEffect(()=> {
        window.scrollTo(0,0)
        const fetchData = async ()=> {
            setIsLoading(true)
            try {
                const result = await axios.get(`${baseURL}/tv/${type}?api_key=${apiKey}`)
                setSeries(result.data.results)
                setTotalPages(result.data.total_pages)
                setCurrentPage(1)
                console.log(result)
            } catch(error) {
                console.log(error)
            }
            setIsLoading(false)
        }

        fetchData()
        navigate(`/tv/${type}?page=${currentPage}`)
    }, [type])

    const handlePageChange = page => {
        setCurrentPage(page)
    }

    let heading
    switch (type) {
        case "airing_today":
            heading = "Airing Today"
            break;
        case "on_the_air":
            heading = "On The Air"
            break;
        case "popular":
            heading = "Popular"
            break;
        case "top_rated":
            heading = "Top Rated"
            break;
    
        default:
            break;
    }

    let pageNumbers = []
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(startPage + 2, totalPages);
    for(let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
    }

    console.log(pageNumbers)
    return (
        <div className="max-w-screen overflow-x-hidden">
            <Header />
            <div className="py-20 w-11/12 mx-auto -z-50">
                <h1 className=" text-xl font-semibold">{heading} Series</h1>
                <div className="flex flex-wrap w-full gap-5">
                    {isLoading ? (
                        <>
                            <HomeSkeleton />
                            <HomeSkeleton />
                            <HomeSkeleton />
                            <HomeSkeleton />
                            <HomeSkeleton />
                            <HomeSkeleton />
                            <HomeSkeleton />
                            <HomeSkeleton />
                            <HomeSkeleton />
                            <HomeSkeleton />
                        </>
                    ) : series.length > 0 && series.map(item => (
                        <ListCard
                            title={item.name}
                            key={item.id}
                            type="tv"
                            id={item.id}
                            poster={item.poster_path ? `${baseimageUrl}${item.poster_path}` : noImage}
                            rating={item.vote_average}
                            releaseDate={item.first_air_date}
                        />
                    ))}
                </div>
                <Pagination 
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </div>
            <Footer />
        </div>
    )
}

export default SeriesList