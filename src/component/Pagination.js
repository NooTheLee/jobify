import { useAppContext } from "../context/appContext"

const Pagination = () => {

    const {
        page,
        changePage,
    } = useAppContext();
    const arr = Array.from({ length: 3 }, (_, index) => (index));

    const numOfPage = 5;

    const prevPage = () => {
        changePage(page - 1)
    }

    const nextPage = () => {
        changePage(page + 1)
    }

    return (
        <div className="pagination"  >
            <nav aria-label="Page navigation example" style={{ position: "absolute", bottom: 0, left: "60vw" }}>
                <ul className="pagination">
                    <li className={`page-item ${page - 1 === 0 ? 'disabled' : ''}`}><button className="page-link" onClick={prevPage} disabled={page - 1 === 0}>Previous</button></li>
                    {page > 3 && <li className={`page-item ${page - 1 === 0 ? 'disabled' : ''}`}><button className="page-link" onClick={prevPage}>...</button></li>}

                    {arr.map((value, key) => (
                        <li className="page-item" key={key}><button className={`page-link ${(page + value) === key + 1 ? "active" : ""}`} onClick={() => changePage(page + 1)}>{page + value}</button></li>
                    ))}
                    {page !== numOfPage && <li className={`page-item ${page - 1 === 0 ? 'disabled' : ''}`}><button className="page-link" onClick={prevPage} disabled={page - 1 === 0}>...</button></li>}
                    <li className={`page-item ${page === numOfPage ? 'disabled' : ''}`}><button className="page-link" onClick={nextPage}>Next</button></li>
                </ul>
            </nav>
        </div>

    )
}

export default Pagination