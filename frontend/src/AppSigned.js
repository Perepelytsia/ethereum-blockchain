import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';


function AppSigned() {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [gasPrice, setGasPrice] = useState(null);

    // Connect MetaMask Wallet
    const connectWallet = async () => {
        if (window.ethereum) {
            const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const signer = web3Provider.getSigner();
            setSigner(signer);
            setAccount(await signer.getAddress());
        } else {
            alert("MetaMask is required.");
        }
    };

    // Fetch Gas Price
    const fetchGasPrice = async () => {
        if (!signer) return;
        const price = await signer.getGasPrice();
        // Convert from wei to gwei
        setGasPrice(ethers.utils.formatUnits(price, "gwei"));
    };

    useEffect(() => {
        if (signer) fetchGasPrice();
    }, [signer]);

    return (
        <div>
            <h2>USDT Signed Transaction</h2>
            {!account ? (<button onClick={connectWallet}>Connect Wallet</button>) : (<p>Connected: {account}</p>)}
            <h3>Gas Price: {gasPrice ? `${gasPrice} Gwei` : "Fetching..."}</h3>
        </div>
    );
}

export default AppSigned;
