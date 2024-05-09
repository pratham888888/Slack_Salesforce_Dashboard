import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './NavBar';
import ProgressBar from './ProgressBar';
import Table from './Table';
import Cases from './data'; // Import the Cases data
import cases from './data';

const App = () => {
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    priority: '',
    jiraFilter: 'all',
  });

  const [filteredCases, setFilteredCases] = useState(Cases); // Use the Cases data
  const [loading, setLoading] = useState(false);

  const getdata = ()=>{
    fetch('http://127.0.0.1:8000/fetch/', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
  .then(data => {
    var obj = JSON.parse(data)
    if(data)
  setFilteredCases(obj)
}
)

  .catch(error => console.error(error));
  }

  // useEffect(() => {
  //   fetch('http://127.0.0.1:8000/fetch/', {
  //     method: "GET",
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   .then(response => response.json())
  // .then(data => {console.log(data);
  //   if(data)
  // setFilteredCases(data)})
  // .catch(error => console.error(error));
  // }, [cases]);

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
    console.log(typeof(cases));
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
        loading={loading}ß
      />
      <ProgressBar loading={loading} />
      <Table filteredCases={filteredCases} />
      <button onClick={getdata}>Fetch Data</button>
    </div>
  );
};

export default App;
