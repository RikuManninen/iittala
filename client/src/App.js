import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

function App() {

  const [hello, setHello] = useState('');
  
  fetch("api/hello")
  .then(res => res.text())
  .then(res => setHello(res))

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {hello}
        </p>
      </header>
    </div>
  );
}

export default App;
