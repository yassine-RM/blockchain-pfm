import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEffect ,useState} from 'react';
import exercices from '../data/exercices';

export default function Exercice() {

  const [exercice, setExercice] = useState({});
  const { id } = useParams();

  
  useEffect(() => {
    if (!exercices[id-1] || isNaN(id-1)) {
      window.location.href = '/';
      return;
    }
   
    const exercice = {
      id,
      title: `Exercice ${id} : ${exercices[id-1].title}`,
      description: `Details - ${exercices[id-1].description}…`
    };

    setExercice(exercice);
    
  }, [])
  

  return (
    <div className="p-8">
      <Link to="/" className="text-blue-500">&larr; Back to list</Link>
      <h1 className="mt-4 text-3xl font-bold">{exercice.title}</h1>
      <p className="mt-2">{exercice.description}</p>
    </div>
  );
}
