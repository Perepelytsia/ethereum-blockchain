const { ethers } = require("ethers");
require('dotenv').config()

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const INFURA_URL = `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`;
// ethers.js v6
const provider = new ethers.JsonRpcProvider(INFURA_URL);

async function getBlockNumber() {
    try {
        const blockNumber = await provider.getBlockNumber();
        console.log(`Block Number: ${blockNumber} `);
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
}

getBlockNumber();
