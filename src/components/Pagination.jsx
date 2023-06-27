import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi"

const Pagination = props => {
  let pageNumbers = []
  const startPage = Math.max(1, props.currentPage - 1);
  const endPage = Math.min(startPage + 2, props.totalPages);
  for(let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }
  return(
      <div>
        <p>page {props.currentPage} of {props.totalPages}</p>
        <div className="flex border border-sky-300 w-fit">
                <button 
                className="p-2 border-r border-sky-300 focus:bg-slate-800" 
                onClick={()=> props.handlePageChange(1)}
                disabled={props.currentPage === 1}>
                    <BiChevronsLeft />
                </button>
                <button 
                className="p-2 border-r border-sky-300 focus:bg-slate-800"
                onClick={()=> props.handlePageChange(props.currentPage - 1)}
                >
                    <FaChevronLeft />
                </button>
                {pageNumbers.map(page => (
                    <button 
                    className={`py-2 px-3 border-r border-sky-300 ${page === props.currentPage && "text-slate-800  bg-sky-300"}`}
                    key={page}
                    onClick={()=> props.handlePageChange(page)}
                    >
                    {page}
                    </button>
                ))}
                <button 
                className="p-2 border-r border-sky-300 focus:bg-slate-800"
                onClick={()=> props.handlePageChange(props.currentPage + 1)}
                disabled={props.currentPage === props.totalPages}
                >
                    <FaChevronRight />
                </button>
                <button 
                className="p-2 focus:bg-slate-800"
                onClick={()=> props.handlePageChange(props.totalPages)}
                disabled={props.currentPage === props.totalPages}
                >
                    <BiChevronsRight />
                </button>
        </div>
    </div>
  )
}

export default Pagination