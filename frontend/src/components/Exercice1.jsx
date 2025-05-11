import React, { useEffect, useState } from 'react';
import getWeb3 from '../utils/web3';
import Addition from '../contracts/Addition.json';

function Exercice1() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Addition.networks[networkId];

        if (!deployedNetwork) {
          throw new Error("Addition contract not deployed on this network.");
        }

        const instance = new web3.eth.Contract(
          Addition.abi,
          deployedNetwork.address
        );

        setContract(instance);
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error loading web3 or contract:", error);
      }
    };

    init();
  }, []);

  const handleSetValues = async () => {
    if (!contract || a === '' || b === '') {
      setResult('❗ Please enter both a and b.');
      return;
    }
    await contract.methods.setValues(a, b).send({ from: account });
    setResult(`✅ Values set: a = ${a}, b = ${b}`);
  };
  
  const handleAddition1 = async () => {
    if (!contract) return;
    const sum = await contract.methods.addition1().call();
    setResult(`Sum of state variables: ${sum}`);
  };
  
  const handleAddition2 = async () => {
    if (!contract || x === '' || y === '') {
      setResult('❗ Please enter both x and y.');
      return;
    }
    const sum = await contract.methods.addition2(x, y).call();
    setResult(`Sum of ${x} and ${y}: ${sum}`);
  };
  

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-8 space-y-6">
      <h2 className="text-xl font-bold text-center">Exercise 1: Addition</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="a"
          value={a}
          onChange={(e) => setA(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <input
          type="number"
          placeholder="b"
          value={b}
          onChange={(e) => setB(e.target.value)}
          className="px-4 py-2 border rounded"
        />
      </div>

      <button onClick={handleSetValues} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Set a & b
      </button>

      <button onClick={handleAddition1} className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600">
        addition1() – Sum of a and b
      </button>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="x"
          value={x}
          onChange={(e) => setX(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <input
          type="number"
          placeholder="y"
          value={y}
          onChange={(e) => setY(e.target.value)}
          className="px-4 py-2 border rounded"
        />
      </div>

      <button onClick={handleAddition2} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
        addition2(x, y)
      </button>

      {result && (
        <div className="mt-4 text-center bg-gray-100 p-4 rounded-lg font-medium text-gray-700">
          {result}
        </div>
      )}
    </div>
  );
}

export default Exercice1;
