import React, { useEffect, useState } from 'react';
import getWeb3 from '../utils/web3';
import ParityChecker from '../contracts/ParityChecker.json';
import BlockchainInfo from './BlockchainInfo';

function Exercice5() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [number, setNumber] = useState('');
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
        const deployedNetwork = ParityChecker.networks[networkId];

        if (!deployedNetwork) {
          throw new Error("Contract not deployed to this network.");
        }

        const instance = new web3.eth.Contract(
          ParityChecker.abi,
          deployedNetwork.address
        );

        const latestBlock = await web3.eth.getBlock('latest');
        const blockNumber = Number(latestBlock.number);
        const blockTimestamp = Number(latestBlock.timestamp) * 1000;
        const readableTimestamp = new Date(blockTimestamp).toLocaleString();
        const blockHash = latestBlock.hash;
        const parentHash = latestBlock.parentHash;
    
        setBlockchainInfo(prev => ({
          ...prev,
          networkId: networkId.toString(),
          contractAddress: deployedNetwork.address,
          account: accounts[0],
          lastBlock: {
            number: blockNumber,
            hash: blockHash,
            timestamp: readableTimestamp,
            parentHash: parentHash,
            transactions: latestBlock.transactions,
            miner: latestBlock.miner || 'N/A'
          }
        }));


        setContract(instance);
        setAccount(accounts[0]);
      } catch (err) {
        console.error("Web3 load error:", err);
      }
    };

    init();
  }, []);

  const handleCheckParity = async () => {
    if (!contract || number === '') {
      setResult('❗ Please enter a number.');
      return;
    }
    const isEven = await contract.methods.estPair(number).call();
    setResult(`${number} is ${isEven ? '🟢 Even (pair)' : '🔴 Odd (impair)'}`);
  };

  return (
    <>
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-8 space-y-6">
      <h2 className="text-xl font-bold text-center">Exercise 5: Parity Checker</h2>

      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter a number"
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <button onClick={handleCheckParity} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
        Check Parity
      </button>

      {result && (
        <div className="mt-6 text-center text-lg font-semibold text-gray-700 bg-gray-100 p-4 rounded-lg">
          {result}
        </div>
      )}
    </div>
        <BlockchainInfo blockchainInfo={blockchainInfo} />
        </>
  );
}

export default Exercice5;
