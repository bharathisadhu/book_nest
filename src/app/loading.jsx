'use client'
import React from 'react';
const loading = () => {
  return (
    <div className="loader-container">
    <div className="spinner">loading......</div>
    <style jsx>{`
      .loader-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      .spinner {
        border: 6px solid #f3f3f3;
        border-top: 6px solid #3498db;
        border-radius: 50%;
        width: 150px;
        height: 150px;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(180deg); }
      }
    `}</style>
  </div>
  );
};
export default loading;