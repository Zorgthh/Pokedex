import React from 'react';
import './PaginationP.css';

export const PaginationP = ({ productsPerPage, currentPage, setCurrentPage, totalPoke }) => {
  const totalPages = Math.ceil(totalPoke / productsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        &#9664; Previous
      </button>
      <span className="pagination-info">
        Page <strong>{currentPage}</strong> of {totalPages}
      </span>
      <button
        className="pagination-button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next &#9654;
      </button>
    </div>
  );
};
