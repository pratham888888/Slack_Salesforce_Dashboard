import React, { useState } from 'react';
import './Table.css'; // Import the CSS file

const Table = ({ filteredCases }) => {
  const itemsPerPage = 5; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first and last items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCases.slice(indexOfFirstItem, indexOfLastItem); // Use filteredCases instead of cases

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="table-container">
      <table className="content-table"> {/* Use the content-table class */}
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Case ID</th>
            <th>JIRA ID</th>
            <th>Date & Time of Creation</th>
            <th>Priority</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((caseData, index) => (
            <tr key={index}>
              <td>{caseData.customerName}</td>
              <td>{caseData.caseId}</td>
              <td>{caseData.jiraId || 'N/A'}</td>
              <td>{caseData.creationDate}</td>
              <td className={`priority-${caseData.priority.toLowerCase()}`}>{caseData.priority}</td> {/* Add class based on priority */}
              <td>{caseData.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredCases.length / itemsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Table;

