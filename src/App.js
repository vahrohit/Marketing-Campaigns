import React, { useState } from 'react';
import './App.css';
import AIForm from './components/AIForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Add a div to wrap the image and heading */}
        <div className="header-container">
          {/* Image on the left side */}
          <img src={`${process.env.PUBLIC_URL}/CodeCruisers.jpg`} alt="CodeCruisers" className="header-image" />
          <h1>Cruiser - AI Text Generator</h1>
        </div>
      </header>
      <main>
        <AIForm />
      </main>
    </div>
  );
}

export default App;