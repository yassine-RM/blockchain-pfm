// src/components/ExerciceLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function ExerciceLayout({exercice,component}) {

    
  return (
    
    (exercice && (
        <div className="App">
            <h1 className="mt-4 text-2xl font-bold">
                {exercice.title || 'Exercice'}
            </h1>
            <p className="text-gray-500">
                {exercice.description || 'No description available'}
            </p>
            <main className="min-h-screen p-5 w-full">
               {component}
            </main>

            <div className="flex justify-start items-center mt-4">
                <Link to="/" className="text-blue-500 underline">
                    &larr; Back to exercices list
                </Link>
            </div>
        </div>
    ))
  );
}
