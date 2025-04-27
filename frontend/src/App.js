import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Exercices from './pages/Exercices';
import Exercice from './pages/Exercice';

import {Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
        <Header />
          <div className="min-h-screen  p-5 w-full">
            <Routes>
                <Route path="/" element={<Exercices />} />
                <Route path="/exercice/:id" element={<Exercice />} />
            </Routes>
          </div>

        <Footer />
    </div>
  );
}

export default App;
