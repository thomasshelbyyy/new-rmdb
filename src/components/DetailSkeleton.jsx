const DetailSkeleton = ()=> {
    return(
        <div  className="bg-sky-800/40 h-full p-10 py-28 md:flex items-center w-full">
            <div className="w-56 h-96 rounded-md bg-gray-600 animate-gradient"></div>
            <div className="p-7">
                <div className='w-80 h-6 mb-10 rounded-md bg-gray-600 animate-gradient'></div>
                <div className='w-72 h-3 mb-10 rounded-md bg-gray-600 animate-gradient'></div>
                <div className='w-32 h-4 mb-5 rounded-md bg-gray-600 animate-gradient'></div>
                <div className='w-52 h-4 mb-5 rounded-md bg-gray-600 animate-gradient'></div>
                <div className='w-96 h-3 mb-5 rounded-md bg-gray-600 animate-gradient'></div>
                <div className='w-96 h-3 mb-5 rounded-md bg-gray-600 animate-gradient'></div>
                <div className='w-96 h-3 mb-5 rounded-md bg-gray-600 animate-gradient'></div>
            </div>
        </div>
    )
}

export default DetailSkeleton