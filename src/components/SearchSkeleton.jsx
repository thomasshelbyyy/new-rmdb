const SearchSkeleton = ()=> {
    return(
        <div className="w-100 rounded-lg border border-slate-300 flex flex-col md:flex-row mb-3">
            <div className="rounded-l-lg w-56 h-64 bg-gray-400 rounded-lg animate-gradient"></div>
            <div className="flex flex-col justify-center px-5 w-full">
                <div className="w-6/12 h-4 mb-3 rounded-md animate-gradient mt-4"></div>
                <div className="w-40 h-3 mb-3 rounded-md animate-gradient"></div>
                <div className="w-10/12 h-3 mb-2 rounded-md animate-gradient"></div>
                <div className="w-10/12 h-3 mb-2 rounded-md animate-gradient"></div>
                <div className="w-10/12 h-3 mb-2 rounded-md animate-gradient"></div>
            </div>
        </div>
    )
}

export default SearchSkeleton