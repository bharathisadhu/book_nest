'use client'
import Link from 'next/link';
import React from 'react';
const error = () => {
  return (
    <div className="error-container">
    <h2 className="error-title">Error</h2>
    <p className="error-message" >Common Error</p>
    <Link href="/" className="home-link">Return Home</Link>
    </div>
  );


  
};
export default error;