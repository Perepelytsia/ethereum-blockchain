import React, { useEffect, useState, Component } from 'react';
import { ethers } from 'ethers';
import logo from './logo.svg';
import './App.css';

function App() {
  const [provider, setProvider] = useState(null);
  const [blockNumber, setBlockNumber] = useState(null);

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
        if (provider) {
            setBlockNumber(provider.getBlockNumber());
        }
    };
    getBlockNumber();
  }, [provider]);

  return (
    <div>
      <h1>Ethers.js and React Integration</h1>
      <p>Block Number <b>{blockNumber}</b></p>
    </div>
  );
}

export default App;
