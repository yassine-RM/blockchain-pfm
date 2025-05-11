import React, { useEffect, useState } from 'react';
import getWeb3 from '../utils/web3';
import Shape from '../contracts/Rectangle.json';
import BlockchainInfo from './BlockchainInfo';

function Exercice7() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [infos, setInfos] = useState('');
  const [surface, setSurface] = useState('');
  const [xy, setXY] = useState('');
  const [loLa, setLoLa] = useState('');
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
        const deployedNetwork = Shape.networks[networkId];

        if (!deployedNetwork) {
          throw new Error("Contract not deployed to this network.");
        }

        const instance = new web3.eth.Contract(
          Shape.abi,
          deployedNetwork.address
        );

        setContract(instance);
        setAccount(accounts[0]);

        // Load initial data
        const info = await instance.methods.afficheInfos().call();
        const surface = await instance.methods.surface().call();
        const coords = await instance.methods.afficheXY().call();
        const sizes = await instance.methods.afficheLoLa().call();

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


        setInfos(info);
        setSurface(surface);
        setXY(`x: ${coords[0]}, y: ${coords[1]}`);
        setLoLa(`Length: ${sizes[0]}, Width: ${sizes[1]}`);

      } catch (err) {
        console.error("Web3 load error:", err);
      }
    };

    init();
  }, []);

  const handleMove = async () => {
    await contract.methods.deplacerForme(2, 3).send({ from: account }); // example move
    const coords = await contract.methods.afficheXY().call();
    setXY(`x: ${coords[0]}, y: ${coords[1]}`);
  };

  return (
    <>
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-8 space-y-6">
      <h2 className="text-xl font-bold text-center">Exercise 7: Geometric Shapes</h2>

      <div className="text-lg space-y-3">
        <p><strong>Info:</strong> {infos}</p>
        <p><strong>Surface:</strong> {surface}</p>
        <p><strong>Coordinates:</strong> {xy}</p>
        <p><strong>Dimensions:</strong> {loLa}</p>
      </div>

      <button onClick={handleMove} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4">
        Move Shape (+2, +3)
      </button>
    </div>
    <BlockchainInfo blockchainInfo={blockchainInfo} />
    </>
  );
}

export default Exercice7;
