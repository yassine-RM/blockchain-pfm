import React from 'react'
import { Link } from 'react-router-dom'

function ExercicesList() {

  const exercices = [
    {
      id: 1,
      name: 'AdditionContract',
      description: 'addition1(), addition2()'
    },
    {
      id: 2,
      name: 'ConversionContract',
      description: 'etherEnWei(), weiEnEther()'
    },
    {
      id: 3,
      name: 'GestionChaines',
      description: 'setMessage(), getMessage(), concatener(), concatenerAvec(), longueur(), comparer()'
    },
    {
      id: 4,
      name: 'NombrePositif',
      description: 'estPositif()'
    },
    {
      id: 5,
      name: 'PariteContract',
      description: 'estPair() or similar'
    },
    {
      id: 6,
      name: 'TableauNombres',
      description: 'ajouterNombre(), getElement(), afficheTableau(), calculerSomme()'
    },
    {
      id: 7,
      name: 'Forme (abstract) + Rectangle',
      description: 'Object-oriented Solidity (inheritance)'
    },
    {
      id: 8,
      name: 'Payment',
      description: 'receivePayment(), withdraw()'
    }
  ]

  return (
    <div className="exercies-list ">
      <h2 className="text-left font-bold text-3xl py-5">List of Exercices</h2>
      <div className="exercices">
          <table class="w-full text-sm text-left rtl:text-right text-black ">
            <thead class="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 ">
              <tr>
                <th scope="col" class="px-2 py-3">
                  Exercice Num
                </th>
                <th scope="col" class="px-2 py-3">
                  Name
                </th>
                <th scope="col" class="px-2 py-3">
                  Description
                </th>
                <th scope="col" class="px-2 py-3">
                  Demo
                </th>
              </tr>
            </thead>
            <tbody>
              {exercices.map((exercice) => (
                <tr class="border-b bg-gray-200 border-gray-200">
                  <td className="px-2 py-2">{exercice.id}</td>
                  <td className="px-2 py-2">{exercice.name}</td>
                  <td className="px-2 py-2">{exercice.description}</td>
                  <td className="px-2 py-2">
                    <Link to={`/exercice/${exercice.id}`}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded cursor-pointer">
                        Try Demo
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
      </div>
    </div>
  )
}

export default ExercicesList