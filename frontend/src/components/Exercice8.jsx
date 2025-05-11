import React, { useEffect, useState } from 'react';
import Web3 from 'web3'; // <-- Import Web3 here
import getWeb3 from '../utils/web3';
import Payment from '../contracts/Payment.json';

function Exercice8() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3(); 
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Payment.networks[networkId];

        if (!deployedNetwork) {
          throw new Error("Contract not deployed to this network.");
        }

        const instance = new web3.eth.Contract(
          Payment.abi,
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

  const handleReceivePayment = async () => {
    if (!contract || amount === '' || recipient === '') {
      setResult('❗ Please fill in the recipient and amount fields.');
      return;
    }

    await contract.methods.receivePayment().send({
      from: account,
      value: Web3.utils.toWei(amount, 'ether') // <-- Use Web3 here to convert Ether to Wei
    });
    setAmount('');
    setRecipient('');
    loadBalance();
  };

  const loadBalance = async () => {
    const currentBalance = await contract.methods.balance().call();
    setBalance(Web3.utils.fromWei(currentBalance, 'ether')); // <-- Use Web3 here to convert Wei to Ether
  };

  const handleWithdraw = async () => {
    if (!contract) {
      setResult('❗ Contract not loaded.');
      return;
    }

    await contract.methods.withdraw().send({ from: account });
    loadBalance();
  };

  return (
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
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount in Ether"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button onClick={handleReceivePayment} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Receive Payment
        </button>

        <button onClick={handleWithdraw} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 mt-4">
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
  );
}

export default Exercice8;
