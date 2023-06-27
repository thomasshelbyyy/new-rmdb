import { Link } from "react-router-dom"

const CollectionMoviesCard = props => {
    return(
        <div className="w-10/12 border border-slate-300 rounded-md mb-3 mx-auto">
            <div className="flex flex-col md:flex-row">
                <img src={props.image} alt={props.title} className="w-52 rounded-md" />
                <div className="flex flex-col justify-center p-3">
                    <Link to={`/detail/movie/${props.id}`} className="text-xl">{props.title}</Link>
                    <p className="font-bold">{props.releaseDate}</p>
                    <p>{props.overview}</p>
                </div>
            </div>
        </div>
    )
}

export default CollectionMoviesCard