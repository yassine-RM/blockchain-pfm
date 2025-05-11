import React, { useEffect, useState } from 'react';
import getWeb3 from '../utils/web3';
import CheckPositive from '../contracts/CheckPositive.json';

function Exercice4() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = CheckPositive.networks[networkId];

        if (!deployedNetwork) {
          throw new Error("Contract not deployed to this network.");
        }

        const instance = new web3.eth.Contract(
          CheckPositive.abi,
          deployedNetwork.address
        );

        setContract(instance);
        setAccount(accounts[0]);
      } catch (err) {
        console.error("Web3 load error:", err);
      }
    };

    init();
  }, []);

  const handleCheck = async () => {
    if (!contract || number === '') {
      setResult('❗ Please enter a number.');
      return;
    }
    const isPositive = await contract.methods.estPositif(number).call();
    setResult(`${number} is ${isPositive ? '✅ positive or zero' : '❌ negative'}`);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-8 space-y-6">
      <h2 className="text-xl font-bold text-center">Exercise 4: Check Positive</h2>

      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter a number"
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button onClick={handleCheck} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Check if Positive
      </button>

      {result && (
        <div className="mt-6 text-center text-lg font-semibold text-gray-700 bg-gray-100 p-4 rounded-lg">
          {result}
        </div>
      )}
    </div>
  );
}

export default Exercice4;
