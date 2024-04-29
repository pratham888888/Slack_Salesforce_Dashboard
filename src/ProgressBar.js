import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ loading }) => {
  return (
    loading && <div className="progress-bar"></div>
  );
};

export default ProgressBar;
