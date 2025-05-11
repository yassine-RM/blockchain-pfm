// src/utils/web3.js
import Web3 from 'web3';

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for page to load
    window.addEventListener("load", async () => {
      try {
        const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
        const web3 = new Web3(provider);
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    });
  });

export default getWeb3;
