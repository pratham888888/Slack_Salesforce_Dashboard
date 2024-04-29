import React, { useState } from 'react';
import './Navbar.css';

const NavBar = ({ filters, setFilters, handleFilterSelect, loading }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchInput.trim() === '') {
      setFilters(prevFilters => ({
        ...prevFilters,
        search: ''
      }));
    } else {
      setFilters(prevFilters => ({
        ...prevFilters,
        search: searchInput.trim()
      }));
    }
  };

  return (
    <header className="navbar">
      <h1 className="case-heading">Case Information</h1>
      <div className="search-panel">
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Search by Case ID, JIRA ID, or Customer Name"
          className="search-input"
        />
        <button className='search-btn' onClick={handleSearchClick} disabled={loading}>Search</button>

        <select name="location" value={filters.location} onChange={handleFilterSelect} className="dropdown">
          <option value="">Location</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
        </select>
        <select name="priority" value={filters.priority} onChange={handleFilterSelect} className="dropdown">
          <option value="">Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select name="jiraFilter" value={filters.jiraFilter} onChange={handleFilterSelect} className="dropdown">
          <option value="all">All Entries</option>
          <option value="withJira">With JIRA Ticket</option>
          <option value="withoutJira">Without JIRA Ticket</option>
        </select>
      </div>
    </header>
  );
};

export default NavBar;

