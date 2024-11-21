

function Pagination({totalPages, activePage, changePage, changeSize }) {
    const pageItems = []; // Itens de paginação
    for (let i = 0; i < totalPages; i++) {
        pageItems.push(
            <li>
                <button className="btn btn-primary" onClick={() => changePage(i + 1)}>
                    {i + 1}
                </button>
            </li>
        );
    }

    const perPage = [2, 5, 10, 15].map((e) => <option value={e}>{e}</option>);

    return (
        <div>
            <ul className="pagination justify-content-center">
                {pageItems}
                <select className="form-select ms-2 w-auto" onChange={changeSize}>
                    {perPage}
                </select>
            </ul>
        </div>
    );
}

export default Pagination;