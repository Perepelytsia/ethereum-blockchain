import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import logo from './logo.svg';
import './App.css';


function App() {
  const [provider, setProvider] = useState(null);
  const [blockNumber, setBlockNumber] = useState(null);
  const [balance, setBalance] = useState('');

  const initializeProvider = async () => {
    if (window.ethereum) {
        //await window.ethereum.request({ method: 'eth_requestAccounts' });
        setProvider(new ethers.providers.Web3Provider(window.ethereum));
    } else {
        console.log('Have to install MetaMask!');
    }
  };
  const getBlockNumber = async () => {
    setBlockNumber(await provider.getBlockNumber());
  };
  const getBalance = async () => {
    const balanceBigNumber = await provider.getBalance(process.env.REACT_APP_WALLET_ADDRESS);
    const balanceInEth = ethers.utils.formatEther(balanceBigNumber);
    setBalance(balanceInEth + ' ether');
  };

  useEffect(() => {
    initializeProvider();
    console.log(ethers.providers.getNetwork(11155111));
  }, []);

  useEffect(() => {
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
