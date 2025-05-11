import React from 'react'

function Header() {
  return (
    <div className="header bg-green-300 p-5">
        <h1 className="text-center font-bold text-5xl uppercase">
            Project fin module (PFM)
        </h1>
        <p className="text-center">
            Using <span className="underline font-bold">Solidity</span>, <span className="underline font-bold">Truffle</span>, <span className="underline font-bold">ReactJs</span>, <span className="underline font-bold">Tailwind CSS</span> and <span className="underline font-bold">Docker</span>
        </p>
    </div>
  )
}

export default Header