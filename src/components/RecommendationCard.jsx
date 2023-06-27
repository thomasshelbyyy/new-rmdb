import { FaStar }from "react-icons/fa"
import { Link } from "react-router-dom"

const RecommendationCard = props => {
    return(
        <div >
            <img src={props.image} alt={props.title} className="h-40 w-auto rounded-md" />
            <div className="flex justify-between items-start px-3 pt-2 w-64">
                <Link to={`/detail/${props.type}/${props.id}`} className="text-xl">{props.title}</Link>
                <p className="text-lg flex items-center"><span><FaStar className="text-yellow-400 mr-2" /></span>{props.rating}</p>
            </div>
        </div>
    )
}

export default RecommendationCard