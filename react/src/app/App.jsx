import React, { useState } from 'react';
import './App.css';
import Sidebar from '../features/sidebar/Sidebar';

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div className='App'>
      {showSidebar && <Sidebar />}
      <button
        className='sidebar-button'
        onClick={() => setShowSidebar(!showSidebar)}
      >
        Toggle Sidebar
      </button>
      <h1>Content</h1>
      <p>Lorem Ipsum</p>
    </div>
  );
}

export default App;
