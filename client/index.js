const { Web3 } = require('web3');
require('dotenv').config()

// Replace with your Infura project ID
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const INFURA_URL = `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`;

// Connect to Ethereum network via Infura
const web3 = new Web3(INFURA_URL); // Directly pass the URL

// Replace with your MetaMask wallet address
const walletAddress = process.env.WALLET_ADDRESS;

async function getBalance() {
    try {
        const balance = await web3.eth.getBalance(walletAddress);
        const balanceInEth = web3.utils.fromWei(balance, 'ether');
        console.log(`Balance: ${balanceInEth} ETH`);
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
}

getBalance();