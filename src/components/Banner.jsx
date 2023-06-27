import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Banner = ()=> {
    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState('')

    const handleChange = event => {
        setInputValue(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        navigate(`/search?query=${inputValue}`)
    }

    return(
        <div className="w-screen h-fit banner  ">
            <div className="bg-sky-800/60 h-full p-10 py-28">
                <h1 className="font-bold text-4xl pb-2">Welcome</h1>
                <h2 className="font-bold text-3xl pb-3">Discover New Content Everyday</h2>
                <form className="flex flex-col md:flex-row items-center justify-center w-10/12 mx-auto pb-3 md:pb-0" onSubmit={handleSubmit}>
                    <input type="text" 
                    placeholder="Find Your Favorite Movie" 
                    className="bg-white text-gray-900 w-10/12 placeholder:text-slate-500 rounded-md px-3 py-2 border-none focus:outline-2 focus:outline-sky-700" 
                    onChange={handleChange}
                    value={inputValue}
                    />
                    <button className="px-3 py-2 bg-sky-600 hover:bg-sky-700 rounded-md" type="submit">Search</button>
                </form>
            </div>
        </div>
    )
}

export default Banner