import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import usdtABI from './ABIS/usdt.json'

function AppContract() {
    const [totalSupply, setTotalSupply] = useState(null);
    const [decimals, setDecimals] = useState(6);
    const [error, setError] = useState("");

    const usdtTotalSupply = async () => {
        if (!window.ethereum) {
            setError("MetaMask is not installed!");
            return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Ensure we are on Ethereum Mainnet
        const network = await provider.getNetwork();
        if (network.chainId !== 1) {
            setError("Please connect to Ethereum Mainnet in Metamask");
            return;
        }

        const usdtContract = new ethers.Contract(process.env.REACT_APP_USDT_ADDRESS, usdtABI, provider);

        // Get decimals
        try {
            const decimalsValue = await usdtContract.decimals();
            setDecimals(decimalsValue);
        } catch (err) {
            console.warn('decimals() failed');
        }

        // Call totalSupply
        const supply = await usdtContract.totalSupply();
        const formattedSupply = ethers.utils.formatUnits(supply, decimals);
        setTotalSupply(formattedSupply);
    };

    useEffect(() => {
        usdtTotalSupply();
    }, []);

    return (
        <div>
            <h1>Ethers.js and React Integration. Contracts</h1>
            {error ?
                (<p>error {error}</p>) :
                totalSupply ?
                    (<p>supply {totalSupply}</p>) :
                    (<p>Loading total supply ...</p>)
            }
        </div>
    );
}

export default AppContract;
