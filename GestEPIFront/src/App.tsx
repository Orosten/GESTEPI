import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import EPIList from './pages/EPIList';
import ControleList from './pages/ControleList';
import EPIDetails from './pages/EPIDetails';
//import AjouterEPI from './pages/AjouterEPI';
import AjouterControle from './pages/AjouterControle';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const navigateTo = (page: string, id: number | null = null) => {
    setCurrentPage(page);
    if (id !== null) {
      setSelectedId(id);
    }
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'epis':
        return <EPIList onViewDetails={(id) => navigateTo('epi-details', id)} onAddEPI={() => navigateTo('ajouter-epi')} />;
      case 'controles':
        return <ControleList />;
      case 'epi-details':
        return selectedId ? <EPIDetails epiId={selectedId} onBack={() => navigateTo('epis')} onAddControle={() => navigateTo('ajouter-controle', selectedId)} /> : <div>EPI non trouvé</div>;
      //case 'ajouter-epi':
      //  return <AjouterEPI onSaved={() => navigateTo('epis')} onCancel={() => navigateTo('epis')} />;
      case 'ajouter-controle':
        return selectedId ? <AjouterControle epiId={selectedId} onSaved={() => navigateTo('epi-details', selectedId)} onCancel={() => navigateTo('epi-details', selectedId)} /> : <div>EPI non trouvé</div>;
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-title">GestEPI</div>
        <div className="navbar-links">
          <button onClick={() => navigateTo('home')}>Accueil</button>
          <button onClick={() => navigateTo('epis')}>EPIs</button>
          <button onClick={() => navigateTo('controles')}>Contrôles</button>
        </div>
      </nav>
      <main className="content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;