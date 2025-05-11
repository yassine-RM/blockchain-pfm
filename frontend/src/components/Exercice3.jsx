import React, { useEffect, useState } from 'react';
import getWeb3 from '../utils/web3';
import GestionChaines from '../contracts/GestionChaines.json';

function Exercice3() {
  const [string1, setString1] = useState('');
  const [string2, setString2] = useState('');
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadBlockchain = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = GestionChaines.networks[networkId];

        if (!deployedNetwork) {
          throw new Error("Contract not deployed to the detected network.");
        }

        const instance = new web3.eth.Contract(
          GestionChaines.abi,
          deployedNetwork.address
        );

        setContract(instance);
        setAccount(accounts[0]);
      } catch (err) {
        console.error("Failed to load web3 or contract", err);
      }
    };

    loadBlockchain();
  }, []);

  const handleSetMessage = async () => {
    if (!contract) return;
    await contract.methods.setMessage(string1).send({ from: account });
    setResult(`Message set to: "${string1}"`);
  };

  const handleGetMessage = async () => {
    if (!contract) return;
    const msg = await contract.methods.getMessage().call();
    setMessage(msg);
    setResult(`Stored message: "${msg}"`);
  };

  const handleConcat = async () => {
    if (!contract) return;
    const output = await contract.methods.concatener(string1, string2).call();
    setResult(`Concatenated: ${output}`);
  };

  const handleConcatWithStored = async () => {
    if (!contract) return;
    const output = await contract.methods.concatenerAvec(string2).call();
    setResult(`Message + String2: ${output}`);
  };

  const handleLength = async () => {
    if (!contract) return;
    const len1 = await contract.methods.longueur(string1).call();
    const len2 = await contract.methods.longueur(string2).call();
    setResult(`Length: String 1 = ${len1}, String 2 = ${len2}`);
  };

  const handleCompare = async () => {
    if (!contract) return;
    const isEqual = await contract.methods.comparer(string1, string2).call();
    setResult(isEqual ? '✅ Strings are equal' : '❌ Strings are different');
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

      <div className="flex flex-wrap gap-3 justify-center mt-6">
        <button onClick={handleSetMessage} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Set Message
        </button>
        <button onClick={handleGetMessage} className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600">
          Get Message
        </button>
        <button onClick={handleConcat} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          Concat (A + B)
        </button>
        <button onClick={handleConcatWithStored} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
          Concat with Stored Message
        </button>
        <button onClick={handleLength} className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">
          Get Length
        </button>
        <button onClick={handleCompare} className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
          Compare Strings
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
