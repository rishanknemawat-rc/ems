import React from "react";

const Pagination = ({ currentPage, setCurrentPage, setPageLimit, pageLimit, totalCount }:
    {
        currentPage: number,
        setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
        setPageLimit: React.Dispatch<React.SetStateAction<number>>,
        pageLimit: number,
        totalCount: number
    }) => {

    const totalPages = Math.ceil(totalCount/pageLimit);
    const pagesToDisplay = [...Array(totalPages + 1).keys()].slice(1); // Array from 1 to N

    const handlePreviousPage = () => {
        if(currentPage !== 1)
            setCurrentPage(currentPage-1);
    }

    const handleNextPage = () => {
        if(currentPage !== totalPages)
            setCurrentPage(currentPage+1);
    }

    return (
        <div className="form-group">
            <div className="form-row">
                <div className="input-group col-md-2 m-4">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="show">Show</label>
                    </div>
                    <select className="custom-select"
                        id="showSelect" defaultValue={5}
                        onChange={e => setPageLimit(e.target.value)}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>

                <nav >
                    <ul className="pagination justify-content-center m-4">
                        <li className="page-item">
                            <button className="page-link" 
                                onClick={handlePreviousPage}
                            >
                                Previous
                            </button>
                        </li>
                        {pagesToDisplay.map((page: number) => (
                            <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}> 
                                <button className="page-link" onClick={e => setCurrentPage(page)}>{page}</button>
                            </li>
                        ))}
                        <li className="page-item">
                            <button className="page-link" 
                                    onClick={e => handleNextPage()}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
};

export default Pagination;