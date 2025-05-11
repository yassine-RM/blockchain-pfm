import React, { useEffect, useState } from 'react';
import getWeb3 from '../utils/web3';
import Addition from '../contracts/Addition.json';
import BlockchainInfo from './BlockchainInfo';

function Exercice1() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [result, setResult] = useState('');

  const [blockchainInfo, setBlockchainInfo] = useState({
    url: 'HTTP://127.0.0.1:7545',
    networkId: null,
    contractAddress: null,
    account: null,
    lastBlock: {
      number: null,
      hash: null,
      timestamp: null,
      transactions: [],
      miner: null,
      parentHash: null,
    }
  });

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

        const latestBlock = await web3.eth.getBlock('latest');

        // Ensure BigInt values are converted to numbers or strings for use
        const blockNumber = Number(latestBlock.number); // Convert BigInt to number
        const blockTimestamp = Number(latestBlock.timestamp) * 1000; // Convert timestamp to number first, then multiply
        const readableTimestamp = new Date(blockTimestamp).toLocaleString(); // Now convert to readable date
        const blockHash = latestBlock.hash;
        const parentHash = latestBlock.parentHash;

        setBlockchainInfo(prev => ({
          ...prev,
          networkId: networkId.toString(),
          contractAddress: deployedNetwork.address,
          account: accounts[0],
          lastBlock: {
            number: blockNumber, // Store as number
            hash: blockHash, // Store hash as string
            timestamp: readableTimestamp, // Store as readable string
            parentHash: parentHash, // Store parentHash as string
            transactions: latestBlock.transactions,
            miner: latestBlock.miner || 'N/A' // Handle missing miner value
          }
        }));

        setContract(instance);
        setAccount(accounts[0]);

        
      } catch (error) {
        console.error("Error loading web3 or contract:", error);
        setResult('❗ Failed to load contract or web3.');
      }
    };

    init();
  }, []);

  const handleSetValues = async () => {
    if (!contract || a === '' || b === '') {
      setResult('❗ Please enter both a and b.');
      return;
    }
    try {
      await contract.methods.setValues(a, b).send({ from: account });
      setResult(`✅ Values set: a = ${a}, b = ${b}`);
      setA('');
      setB('');
    } catch (error) {
      setResult('❗ Error setting values.');
    }
  };

  const handleAddition1 = async () => {
    if (!contract) return;
    try {
      const sum = await contract.methods.addition1().call();
      setResult(`Sum of state variables: ${sum}`);
    } catch (error) {
      setResult('❗ Error calling addition1.');
    }
  };

  const handleAddition2 = async () => {
    if (!contract || x === '' || y === '') {
      setResult('❗ Please enter both x and y.');
      return;
    }
    try {
      const sum = await contract.methods.addition2(x, y).call();
      setResult(`Sum of ${x} and ${y}: ${sum}`);
      setX('');
      setY('');
    } catch (error) {
      setResult('❗ Error calling addition2.');
    }
  };

  return (
    <>
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-8 space-y-6">
      <h2 className="text-xl font-bold text-center">Exercise 1: Addition</h2>

      {/* Set a and b values */}
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

      {/* Button to set a and b values */}
      <button
        onClick={handleSetValues}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Set a & b
      </button>

      {/* Button to perform addition1 */}
      <button
        onClick={handleAddition1}
        className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
      >
        addition1() – Sum of a and b
      </button>

      {/* Input for x and y */}
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

      {/* Button to perform addition2 */}
      <button
        onClick={handleAddition2}
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        addition2(x, y)
      </button>

      {/* Displaying the result */}
      {result && (
        <div className="mt-4 text-center bg-gray-100 p-4 rounded-lg font-medium text-gray-700">
          {result}
        </div>
      )}
    </div>
    <BlockchainInfo blockchainInfo={blockchainInfo} />
    </>
  );
}

export default Exercice1;
