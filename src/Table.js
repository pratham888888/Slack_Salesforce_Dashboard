import React, { useState } from 'react';
import './Table.css'; // Import the CSS file

const Table = ({ filteredCases }) => {
  const itemsPerPage = 10; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first and last items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCases.slice(indexOfFirstItem, indexOfLastItem); // Use filteredCases instead of cases

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [open, setOpen] = React.useState(false);
 
    const handleClose = (id) => {
      setOpen(!open)
      document.getElementById(id).hidden = open
    };
 
    const handleOpen = (id) => {
      setOpen(!open)
      document.getElementById(id).hidden = open
    };

  return (
    <div className="table-container">
      <table className="content-table"> {/* Use the content-table class */}
        <thead>
          <tr>  
            <th>Case ID</th>
            <th>JIRA ID</th>
            <th>JIRA status</th>
            <th>JIRA Created</th>
            <th>Customer Name</th>
            <th>Case Created</th>
            <th>Priority</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?currentItems.map((caseData, index) => (
       
            <tr key={index}>
              <td onClick={()=>handleOpen(caseData.caseid)}>{caseData.caseid}</td>
              <p id={caseData.caseid} onClick={()=>handleClose(caseData.caseid)} hidden>{caseData.text}</p>
              <td><a href={caseData.jiralink} target="_blank">{caseData.jiralink?caseData.jiralink.substring(caseData.jiralink.lastIndexOf("/")+1):null}</a></td>
              <td>{caseData.jirastatus}</td>
              <td>{caseData.jiracreated}</td>
              <td>{caseData.ownerName || 'N/A'}</td>
              <td>{caseData.datetime}</td>

              <td className={`priority-${caseData.priority.toLowerCase()}`}>{caseData.priority}</td> {/* Add class based on priority */}
              <td>Top</td>
            </tr>
          )):null}
          
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

