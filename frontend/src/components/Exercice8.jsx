import React, { useEffect, useState } from 'react';
import getWeb3 from '../utils/web3';
import Payment from '../contracts/Payment.json';
import BlockchainInfo from './BlockchainInfo';

function Exercice8() {
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState('');
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
        const web3Instance = await getWeb3();
        const accounts = await web3Instance.eth.getAccounts();
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = Payment.networks[networkId];

        if (!deployedNetwork) {
          throw new Error("Contract not deployed to this network.");
        }

        const instance = new web3Instance.eth.Contract(
          Payment.abi,
          deployedNetwork.address
        );

        const latestBlock = await web3Instance.eth.getBlock('latest');
        const readableTimestamp = new Date(Number(latestBlock.timestamp) * 1000).toLocaleString();

        setBlockchainInfo(prev => ({
          ...prev,
          networkId: networkId.toString(),
          contractAddress: deployedNetwork.address,
          account: accounts[0],
          lastBlock: {
            number: latestBlock.number,
            hash: latestBlock.hash,
            timestamp: readableTimestamp,
            parentHash: latestBlock.parentHash,
            transactions: latestBlock.transactions,
            miner: latestBlock.miner || 'N/A'
          }
        }));

        setWeb3(web3Instance);
        setContract(instance);
        setAccount(accounts[0]);
        loadBalance(web3Instance, instance);
      } catch (err) {
        console.error("Web3 load error:", err);
        setResult(`❗ Error: ${err.message}`);
      }
    };

    init();
  }, []);

  const handleSendPayment = async () => {
    try {
      if (!web3 || !contract || !amount) {
        setResult('❗ Please enter amount and connect to Web3.');
        return;
      }

      await contract.methods.deposit().send({
        from: account,
        value: web3.utils.toWei(amount, 'ether')
      });
      

      setAmount('');
      setResult('✅ Payment sent successfully!');
      loadBalance(web3, contract);
    } catch (error) {
      setResult(`❌ Error sending payment: ${error.message}`);
    }
  };

  const handleWithdraw = async () => {
    try {
      if (!contract) return;
      await contract.methods.withdraw().send({ from: account });
      setResult('✅ Funds withdrawn successfully!');
      loadBalance(web3, contract);
    } catch (error) {
      setResult(`❌ Withdraw failed: ${error.message}`);
    }
  };

  const handleSetRecipient = async () => {
    try {
      if (!contract || !recipient) return;
      await contract.methods.setRecipient(recipient).send({ from: account });
      setResult('✅ Recipient set successfully!');
    } catch (error) {
      setResult(`❌ Failed to set recipient: ${error.message}`);
    }
  };

  const loadBalance = async (web3Instance, contractInstance) => {
    try {
      const currentBalance = await web3Instance.eth.getBalance(contractInstance.options.address);
      setBalance(web3Instance.utils.fromWei(currentBalance, 'ether'));
    } catch (err) {
      console.error("Error loading balance:", err);
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-8 space-y-6">
        <h2 className="text-xl font-bold text-center">Exercise 8: Payment Contract</h2>

        <div className="space-y-4">
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Recipient address"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button onClick={handleSetRecipient} className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
            Set Recipient
          </button>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount in Ether"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button onClick={handleSendPayment} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Send Payment
          </button>

          <button onClick={handleWithdraw} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
            Withdraw Funds
          </button>
        </div>

        {result && (
          <div className="mt-6 text-center text-lg font-semibold text-gray-700 bg-gray-100 p-4 rounded-lg">
            {result}
          </div>
        )}

        {balance !== '' && (
          <div className="mt-4 text-center text-lg">
            <h3 className="font-semibold">Contract Balance:</h3>
            <p>{balance} ETH</p>
          </div>
        )}
      </div>

      <BlockchainInfo blockchainInfo={blockchainInfo} />
    </>
  );
}

export default Exercice8;
