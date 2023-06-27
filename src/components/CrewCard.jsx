const CrewCard = props => {
    return(
        <div className="w-44 px-4 py-3 border border-my-primary rounded-md bg-slate-300">
            <p className="text-xl font-bold text-black">{props.name}</p>
            <p className="text-lg text-slate-700">{props.job}</p>
        </div>
    )
}

export default CrewCard