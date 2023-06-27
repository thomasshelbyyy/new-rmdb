import { Link } from "react-router-dom"

const SearchCard = props => {
    return(
        <div className="w-100 rounded-lg border border-slate-300 flex flex-col md:flex-row mb-3">
            <img src={props.image} alt={props.title} className="rounded-l-lg w-40 h-fit" />
            <div className="flex flex-col justify-center px-5">
                <Link to={`/detail/${props.type}/${props.id}`} className="text-xl font-bold mb-2">{props.title}</Link>
                <p className="font-medium text-lg">{props.releaseDate}</p>
                <p>{props.overview}</p>
            </div>
        </div>
    )
}

export default SearchCard