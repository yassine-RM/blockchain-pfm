import React from 'react'
import { Link } from 'react-router-dom'


function Exercice({exercice}) {
  return (
    <tr className="border-b bg-gray-200 border-gray-200">
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
  )
}

export default Exercice