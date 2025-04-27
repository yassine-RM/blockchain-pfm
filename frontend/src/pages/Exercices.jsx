import React from 'react'
import Exercice from '../components/Exercice'

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
                  Name
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
                    <Exercice key={exercice.id}  exercice={exercice}  />
              ))}

            </tbody>
          </table>
      </div>
    </div>
  )
}

export default Exercices