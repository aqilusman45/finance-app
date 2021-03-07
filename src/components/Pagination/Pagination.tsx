import React from "react";
import "./Pagination.css";
import Pagination from "react-js-pagination";

interface PaginationProps {
  data: any;
  itemsPerPage: number;
  setCurrentPage: (num: number) => void;
  currentPage: number;
}

const PaginationView = ({
  data,
  itemsPerPage,
  setCurrentPage,
  currentPage,
}: PaginationProps) => {
  let active = currentPage;
  const pageNumbers = data?.length;

  const handleClick = (data: any) => {
    setCurrentPage(Number(data));
    active = Number(data);
  };

  return (
    <div className="pgStyle">
      <Pagination
        activePage={active}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={pageNumbers}
        pageRangeDisplayed={10}
        onChange={(e: any) => handleClick(e)}
      />
    </div>
  );
};

export default PaginationView;
