import React, { useEffect, useState } from 'react';
import getWeb3 from '../utils/web3';

function BlockchainDashboard() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [network, setNetwork] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchBlockchainData = async () => {
      try {
        const web3Instance = await getWeb3();
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.getAccounts();
        const netId = await web3Instance.eth.net.getId();
        const ethBalance = await web3Instance.eth.getBalance(accounts[0]);
        const fromWei = web3Instance.utils.fromWei;

        const networkNames = {
          1: 'Mainnet',
          3: 'Ropsten',
          4: 'Rinkeby',
          5: 'Goerli',
          11155111: 'Sepolia',
          1337: 'Localhost',
        };

        setAccount(accounts[0]);
        setBalance(fromWei(ethBalance, 'ether'));
        setNetwork(`${networkNames[netId] || 'Unknown'} (ID: ${netId})`);

        // Load last 5 transactions manually from latest blocks
        const latestBlock = await web3Instance.eth.getBlockNumber();
        const txs = [];

        for (let i = latestBlock; i > latestBlock - 20 && txs.length < 5; i--) {
          const block = await web3Instance.eth.getBlock(i, true); // include transactions
          if (block && block.transactions) {
            block.transactions.forEach(tx => {
              if (tx.from.toLowerCase() === accounts[0].toLowerCase() || (tx.to && tx.to.toLowerCase() === accounts[0].toLowerCase())) {
                txs.push(tx);
              }
            });
          }
        }

        setTransactions(txs.slice(0, 5));
      } catch (err) {
        console.error('Blockchain data fetch error:', err);
      }
    };

    fetchBlockchainData();
  }, []);

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md mb-8 space-y-4">
      <h2 className="text-xl font-bold">🔍 Blockchain Dashboard</h2>
      <div><strong>👤 Account:</strong> {account}</div>
      <div><strong>🌐 Network:</strong> {network}</div>
      <div><strong>💰 Balance:</strong> {balance} ETH</div>

      <h3 className="mt-4 font-semibold text-lg">📄 Latest Transactions</h3>
      <ul className="space-y-2 text-sm">
        {transactions.length === 0 && <li>No recent transactions found.</li>}
        {transactions.map((tx, index) => (
          <li key={index} className="bg-white p-2 border rounded">
            <div><strong>Hash:</strong> <a href={`https://etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">{tx.hash.slice(0, 30)}...</a></div>
            <div><strong>From:</strong> {tx.from}</div>
            <div><strong>To:</strong> {tx.to || 'Contract Creation'}</div>
            <div><strong>Value:</strong> {web3.utils.fromWei(tx.value, 'ether')} ETH</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlockchainDashboard;
