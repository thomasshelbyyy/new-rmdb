import { FaStar } from "react-icons/fa"
import { Link } from "react-router-dom"

const ListCard = props => {
    return(
        <div className="flex-shrink-0 px-4 w-40">
            <img src={props.poster} alt={props.title} className="w-full rounded-md" />
            <div className="flex items-center py-1">
                <FaStar className="text-yellow-400 mr-1" />
                {props.rating}
            </div>
            <Link to={`/detail/${props.type}/${props.id}`} className="text-2xl py-2">{props.title}</Link>
            <p className="font-light text-gray-400 pb-7">{props.releaseDate}</p>
        </div>
    )
}

export default ListCard