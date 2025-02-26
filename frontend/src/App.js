import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import logo from './logo.svg';
import './App.css';
//require('dotenv').config();


function App() {
  const [provider, setProvider] = useState(null);
  const [blockNumber, setBlockNumber] = useState(null);
  const [balance, setBalance] = useState('');

  useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        //await window.ethereum.request({ method: 'eth_requestAccounts' });
        //const provider = new ethers.providers.Web3Provider(window.ethereum);
        //const ppp = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(new ethers.providers.Web3Provider(window.ethereum));
      }
    };
    initializeProvider();
  }, []);

  useEffect(() => {
    const getBlockNumber = async () => {
        setBlockNumber(await provider.getBlockNumber());
    };
    const getBalance = async () => {
        const balanceBigNumber = await provider.getBalance(process.env.REACT_APP_WALLET_ADDRESS);
        const balanceInEth = ethers.utils.formatEther(balanceBigNumber);
        setBalance(balanceInEth + ' ether');
    };
    if (provider) {
        getBalance();
        getBlockNumber();
    }
  }, [provider]);

  return (
    <div>
      <h1>Ethers.js and React Integration</h1>
      <p>Block Number <b>{blockNumber}</b></p>
      <p>Balance <b>{balance}</b></p>
    </div>
  );
}

export default App;
