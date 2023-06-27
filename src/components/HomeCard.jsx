import { FaStar } from "react-icons/fa"
import { Link } from "react-router-dom"

const HomeCard = props=> {
    return(
        <div className="flex-shrink-0 px-4 w-40">
            <div className="relative">
                <img src={props.poster} alt={props.title} className="w-full rounded-md" />
                <div className="absolute flex justify-center items-center top-0 left-0 bg-slate-800 opacity-75 px-3 py-2"><FaStar className="text-yellow-400 mr-1" />{props.rating}</div>
            </div>
            <Link to={`/detail/${props.type}/${props.id}`} className="text-2xl py-2">{props.title}</Link>
            <p className="font-light text-gray-400 pb-7">{props.releaseDate}</p>
        </div>
    )
}

export default HomeCard