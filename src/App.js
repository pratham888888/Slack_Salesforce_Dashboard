import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './NavBar';
import ProgressBar from './ProgressBar';
import Table from './Table';
import Cases from './data'; // Import the Cases data

const App = () => {
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    priority: '',
    jiraFilter: 'all',
  });

  const [filteredCases, setFilteredCases] = useState(Cases); // Use the Cases data
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleFilterSelect = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  // Apply filters
  useEffect(() => {
    const filteredData = Cases.filter((caseData) => {
      const searchString = filters.search.toLowerCase();
      return (
        caseData.caseId.toLowerCase().includes(searchString) ||
        (caseData.jiraId && caseData.jiraId.toLowerCase().includes(searchString)) ||
        caseData.customerName.toLowerCase().includes(searchString)
      ) &&
        (filters.location === '' || caseData.location.toLowerCase() === filters.location.toLowerCase()) &&
        (filters.priority === '' || caseData.priority.toLowerCase() === filters.priority.toLowerCase()) &&
        (filters.jiraFilter === 'all' || 
          (filters.jiraFilter === 'withJira' && caseData.jiraId) || 
          (filters.jiraFilter === 'withoutJira' && !caseData.jiraId)
        );
    });
  
    setFilteredCases(filteredData);
  }, [filters]);
  

  return (
    <div>
      <NavBar
        filters={filters}
        setFilters={setFilters}
        handleInputChange={handleInputChange}
        handleFilterSelect={handleFilterSelect}
        handleSearch={handleSearch}
        loading={loading}
      />
      <ProgressBar loading={loading} />
      <Table  cases={Cases} filteredCases={filteredCases} />
    </div>
  );
};

export default App;
