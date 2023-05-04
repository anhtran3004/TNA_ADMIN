import { FC } from 'react'

type Props = {
    postsPerPage: number
    totalPosts: number
    paginate: (pageNumber: number) => void
    currentPage: number
}

const Pagination: FC<Props> = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} href="#" className={(currentPage === number) ? "active-page" : "page-link"}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination