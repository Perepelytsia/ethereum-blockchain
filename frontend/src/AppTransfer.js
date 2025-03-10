import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';


function AppTransfer() {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [gasPrice, setGasPrice] = useState(null);
    const [balance, setBalance] = useState(null);

    // Connect MetaMask Wallet
    const connectWallet = async () => {
        if (window.ethereum) {
            const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
            try {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: "0xaa36a7" }], // Sepolia Chain ID (0xaa36a7 in hex)
                });
                console.log("Switched to Sepolia Testnet!");
            } catch (error) {
                console.log(error);
            }
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const signer = web3Provider.getSigner();
            setSigner(signer);
            setAccount(await signer.getAddress());
        } else {
            alert("MetaMask is required.");
        }
    };

    const makeTransfer = async () => {
        console.log("here");
    };

    // Fetch Gas Price
    const fetchGasPrice = async () => {
        if (!signer) return;
        try {
            const gas = await signer.estimateGas({
                from: process.env.REACT_APP_WALLET_MASTER_ADDRESS,
                to: process.env.REACT_APP_WALLET_SLAVE_ADDRESS,
                value: ethers.utils.parseUnits("0.0000001", "ether"),
            });
            setGasPrice(gas);
        } catch(error) {
            console.log(error);
        }
    };

    const fetchBalance = async () => {
        if (!signer) return;
        const balanceBigNumber = await signer.getBalance(account);
        const balanceInEth = ethers.utils.formatEther(balanceBigNumber);
        setBalance(balanceInEth + ' ether');
    };

    useEffect(() => {
        if (signer) fetchBalance();
        if (signer) fetchGasPrice();
    }, [signer]);

    return (
        <div>
            <h2>Signed Transaction</h2>
            {!account ? (<button onClick={connectWallet}>Connect Wallet</button>) : (<p>Connected: {account}</p>)}
            <h3>Balance master: {balance ? `${balance} ` : "Fetching..."}</h3>
            <h3>Gas Price: {gasPrice ? `${gasPrice} ` : "Fetching..."}</h3>
            {account ? (<button onClick={makeTransfer}>Make Transfer</button>) : (<p></p>)}
        </div>
    );
}

export default AppTransfer;
