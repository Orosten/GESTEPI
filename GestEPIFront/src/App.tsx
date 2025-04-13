import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import EPIList from './pages/EPIList';
import ControleList from './pages/ControleList';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'epis':
        return <EPIList />;
      case 'controles':
        return <ControleList />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-title">GestEPI</div>
        <div className="navbar-links">
          <button onClick={() => setCurrentPage('home')}>Accueil</button>
          <button onClick={() => setCurrentPage('epis')}>EPIs</button>
          <button onClick={() => setCurrentPage('controles')}>Contrôles</button>
        </div>
      </nav>
      <main className="content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;