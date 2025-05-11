// src/components/ExerciceLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function ExerciceLayout({exercice,component}) {

    
  return (
    
    (exercice && (
        <div className="App">
            <div className="flex justify-start items-center my-4">
            <Link
                to="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                <span className="mr-2">←</span> Back to Exercises List
            </Link>

            </div>
            <h1 className="mt-4 text-2xl font-bold">
                {exercice.title || 'Exercice'}
            </h1>
            <p className="text-gray-500">
                {exercice.description || 'No description available'}
            </p>
            <main className="p-5 w-full">
               {component}
            </main>

        </div>
    ))
  );
}
