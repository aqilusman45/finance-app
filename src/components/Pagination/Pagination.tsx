import React from "react";
import "./Pagination.css";

interface PaginationProps {
  data: any;
  itemsPerPage: number;
  setCurrentPage: (num: number) => void;
  currentPage: number;
}

const Pagination = ({
  data,
  itemsPerPage,
  setCurrentPage,
  currentPage,
}: PaginationProps) => {
  let active = currentPage;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data?.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (event: any) => {
    setCurrentPage(Number(event));
    active = Number(event);
  };
  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        onClick={() => handleClick(number)}
        className={`page-item `}
      >
        <button className={`page-link  ${active === number ? "active" : ""}`}>
          {number}
        </button>
      </li>
    );
  });

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {renderPageNumbers}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
