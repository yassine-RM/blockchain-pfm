import React, { useState } from 'react';

function Exercice3() {
  const [string1, setString1] = useState('');
  const [string2, setString2] = useState('');
  const [result, setResult] = useState('');

  const handleCompare = () => {
    setResult(string1 === string2 ? '✅ Strings are equal' : '❌ Strings are different');
  };

  const handleSplit = () => {
    setResult(`String 1 Split: [${string1.split('').join(', ')}]`);
  };

  const handleConcat = () => {
    setResult(`Concatenated: ${string1 + string2}`);
  };

  const handleGetSize = () => {
    setResult(`Size: String 1 = ${string1.length}, String 2 = ${string2.length}`);
  };

  const handleGetMessage = () => {
    setResult(`Message: "${string1}" | "${string2}"`);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-8 space-y-6">
      <div className="space-y-4">
        <input
          type="text"
          value={string1}
          onChange={(e) => setString1(e.target.value)}
          placeholder="Enter first string"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          value={string2}
          onChange={(e) => setString2(e.target.value)}
          placeholder="Enter second string"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-6">
        <button onClick={handleCompare} className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
          Compare
        </button>
        <button onClick={handleSplit} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Split
        </button>
        <button onClick={handleConcat} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          Concat
        </button>
        <button onClick={handleGetSize} className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">
          Get Size
        </button>
        <button onClick={handleGetMessage} className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600">
          Get Message
        </button>
      </div>

      {result && (
        <div className="mt-6 text-center text-lg font-semibold text-gray-700 bg-gray-100 p-4 rounded-lg">
          {result}
        </div>
      )}
    </div>
  );
}

export default Exercice3;
