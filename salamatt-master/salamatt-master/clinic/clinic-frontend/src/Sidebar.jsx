import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div class={`sidebar ${isOpen ? 'open' : ''}`}>
      <button class="toggle-button" onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Open'}
      </button>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/complaints">Complaints</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
