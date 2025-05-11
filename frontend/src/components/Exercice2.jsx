import React, { useEffect, useState } from 'react';
import getWeb3 from '../utils/web3';
import Conversion from '../contracts/Conversion.json';
import BlockchainInfo from './BlockchainInfo';


function Exercice2() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [etherValue, setEtherValue] = useState('');
  const [weiValue, setWeiValue] = useState('');
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
        const deployedNetwork = Conversion.networks[networkId];

        if (!deployedNetwork) {
          throw new Error("Contract not deployed to this network.");
        }

        const instance = new web3.eth.Contract(
          Conversion.abi,
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

  const handleEtherToWei = async () => {
    if (!contract || etherValue === '') {
      setResult('❗ Enter an Ether amount.');
      return;
    }
    const wei = await contract.methods.etherEnWei(etherValue).call();
    setResult(`${etherValue} Ether = ${wei} Wei`);
  };

  const handleWeiToEther = async () => {
    if (!contract || weiValue === '') {
      setResult('❗ Enter a Wei amount.');
      return;
    }
    const ether = await contract.methods.weiEnEther(weiValue).call();
    setResult(`${weiValue} Wei = ${ether} Ether`);
  };

  return (
    <>
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-8 space-y-6">
      <h2 className="text-xl font-bold text-center">Exercise 2: Ether & Wei Conversion</h2>

      <div className="space-y-4">
        <input
          type="number"
          value={etherValue}
          onChange={(e) => setEtherValue(e.target.value)}
          placeholder="Enter Ether"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button onClick={handleEtherToWei} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Convert Ether ➡ Wei
        </button>

        <input
          type="number"
          value={weiValue}
          onChange={(e) => setWeiValue(e.target.value)}
          placeholder="Enter Wei"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button onClick={handleWeiToEther} className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600">
          Convert Wei ➡ Ether
        </button>
      </div>

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

export default Exercice2;
