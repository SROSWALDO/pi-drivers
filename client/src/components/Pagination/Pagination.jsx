import "./Pagination.css"

export default function Pagination( {currentPage, cardsForPage, totalCards, onPageChange } ) {

    const totalPages = Math.ceil(totalCards / cardsForPage)

    const handlePageClick = (page) => {
        if(page >= 1 && page <= totalPages){
            onPageChange(page)
        }
    }


    return(
        <>
        <div className="container-pagination">
            <button className="button-pagination" onClick={() => handlePageClick(1)} > First </button>
            <button className="button-pagination" onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1} > Back </button>
            
            <span className="span">
                {" "}
                {currentPage} OF {totalPages}{" "}
            </span>

            <button className="button-pagination" onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages} > Next </button>
            <button className="button-pagination" onClick={() => handlePageClick(totalPages)} > Last </button>

        </div>
        </>

    );

}