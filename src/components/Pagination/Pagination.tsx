import React from "react";

interface PaginationProps {
  data: any;
  itemsPerPage: number;
  setCurrentPage: (num: number) => void;
}
const Pagination = ({ data, itemsPerPage, setCurrentPage }: PaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data?.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (event: any) => {
    setCurrentPage(Number(event));
  };

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        className="page-item"
        onClick={() => handleClick(number)}
      >
        <a className="page-link">{number}</a>
      </li>
    );
  });

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item" onClick={() => handleClick(1)}>
          <a className="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        {renderPageNumbers}
        <li className="page-item">
          <a className="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
