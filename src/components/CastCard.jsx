const CastCard = props => {
    return(
        <div className="rounded-md w-56 h-fit border border-my-primary bg-slate-300 mx-auto">
            <img src={props.image} alt={props.name} className="w-full rounded-md" />
            <div className="pl-3 pb-3">
                <p className="text-xl font-bold text-black">{props.name}</p>
                <p className="text-lg text-slate-700">{props.character}</p>
            </div>
        </div>
    )
}

export default CastCard