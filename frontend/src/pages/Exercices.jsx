import React from 'react'
import Exercice from '../components/Exercice1'
import { Link } from 'react-router-dom'

import exercices from '../data/exercices'

function Exercices() {


  return (
    <div className="exercies-list ">
      <h2 className="text-left font-bold text-3xl py-5">List of Exercices</h2>
      <div className="exercices">
          <table className="w-full text-sm text-left rtl:text-right text-black ">
            <thead className="text-xs  uppercase bg-gray-400 ">
              <tr>
                <th scope="col" className="px-2 py-3">
                  Exercice Num
                </th>
                <th scope="col" className="px-2 py-3">
                  Title
                </th>
                <th scope="col" className="px-2 py-3">
                  Description
                </th>
                <th scope="col" className="px-2 py-3">
                  Demo
                </th>
              </tr>
            </thead>
            <tbody>
              {exercices.map((exercice) => (
                <tr key={exercice.id} className="border-b bg-gray-200 border-gray-200">
                      <td className="px-2 py-2">{exercice.id}</td>
                      <td className="px-2 py-2">{exercice.title}</td>
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

export default Exercices