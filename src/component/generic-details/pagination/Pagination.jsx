import React from 'react';

const Pagination = ({elementsPerPage, totalElements, paginate}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav className='d-flex justify-content-center mt-5'>
            <ul className='pagination'>
                {pageNumbers.map(number =>
                    <li
                        key={number}
                        className='page-item'>
                        <a onClick={()=>{paginate(number)}} href="#" className='page-link border-1 text-secondary'>{number}</a>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;