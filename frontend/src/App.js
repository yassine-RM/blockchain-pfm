import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ExercicesList from './components/ExercicesList';

function App() {
  return (
    <div className="App">
        <Header />
          <div className="min-h-screen p-5 w-full">
              <ExercicesList />
          </div>
        <Footer />
    </div>
  );
}

export default App;
