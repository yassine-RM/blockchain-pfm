import React, { useEffect, useState } from 'react';
import getWeb3 from '../utils/web3';
import NumbersSum from '../contracts/NumbersSum.json';

function Exercice6() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [number, setNumber] = useState('');
  const [nombres, setNombres] = useState([]);
  const [result, setResult] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = NumbersSum.networks[networkId];

        if (!deployedNetwork) {
          throw new Error("Contract not deployed to this network.");
        }

        const instance = new web3.eth.Contract(
          NumbersSum.abi,
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

  const handleAddNumber = async () => {
    if (!contract || number === '') {
      setResult('❗ Please enter a number.');
      return;
    }
    await contract.methods.ajouterNombre(Number(number)).send({ from: account });
    setNumber('');
    loadNumbers();
  };

  const loadNumbers = async () => {
    const numbersList = await contract.methods.afficheTableau().call();
    setNombres(numbersList);
  };

  const handleCalculateSum = async () => {
    if (!contract) {
      setResult('❗ Contract not loaded.');
      return;
    }
    const sum = await contract.methods.calculerSomme().call();
    setResult(`The sum of the numbers is: ${sum}`);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-8 space-y-6">
      <h2 className="text-xl font-bold text-center">Exercise 6: Numbers Sum</h2>

      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter a number"
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <button onClick={handleAddNumber} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Add Number
      </button>

      <button onClick={handleCalculateSum} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 mt-4">
        Calculate Sum
      </button>

      {result && (
        <div className="mt-6 text-center text-lg font-semibold text-gray-700 bg-gray-100 p-4 rounded-lg">
          {result}
        </div>
      )}

      {nombres.length > 0 && (
        <div className="mt-4 text-center text-lg">
          <h3 className="font-semibold">Numbers List:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {nombres.map((num, index) => (
              <li key={index}>{num}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Exercice6;
