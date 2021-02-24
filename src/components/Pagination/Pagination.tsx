import React from "react";
import "./Pagination.css";

interface PaginationProps {
  data: any;
  itemsPerPage: number;
  setCurrentPage: (num: number) => void;
}

const Pagination = ({
  data,
  itemsPerPage,
  setCurrentPage,
}: PaginationProps) => {

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
        <button className="page-link">{number}</button>
      </li>
    );
  });

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item" onClick={() => handleClick(1)}>
          <button className="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </button>
        </li>
        {renderPageNumbers}
        <li className="page-item">
          <button className="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
