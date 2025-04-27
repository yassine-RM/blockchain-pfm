// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Exercices from './pages/Exercices';

// Import all exercise components
import Exercice1 from './components/Exercice1';
import Exercice2 from './components/Exercice2';
import Exercice3 from './components/Exercice3';
import Exercice4 from './components/Exercice4';
import Exercice5 from './components/Exercice5';
import Exercice6 from './components/Exercice6';
import Exercice7 from './components/Exercice7';
import Exercice8 from './components/Exercice8';

// Import ExerciceLayout (for exercises)
import ExerciceLayout from './pages/ExerciceLayout';
import exercices from './data/exercices';

// Map ID to components
const componentMap = {
  1: Exercice1,
  2: Exercice2,
  3: Exercice3,
  4: Exercice4,
  5: Exercice5,
  6: Exercice6,
  7: Exercice7,
  8: Exercice8,
};

function App() {
  return (
    <Router>
      <Header />
      <div className="min-h-screen p-5 w-full">
        <Routes>
          {/* Home / list of exercises */}
          <Route path="/" element={<Exercices />} />

          {/* Dynamic exercise route */}
          <Route path="/exercice/:id" element={<ExerciceRouter />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

function ExerciceRouter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const numId = parseInt(id, 10);

  const Component = componentMap[numId];

  // If no component found for ID, redirect
  if (!Component) {
    navigate("/");
    return null;
  }

  const exerciceData = exercices[numId - 1]; // Assuming array index matches (ID - 1)

  const exercice = {
    id: numId,
    title: `Exercice ${numId}: ${exerciceData?.title || "Untitled"}`,
    description: `Details - ${exerciceData?.description || "No description available"}`,
  };

  return <ExerciceLayout exercice={exercice} component={<Component />} />;
}

export default App;
