require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat-gas-reporter");
//require('solidity-coverage');
const walletUtils = require("./walletUtils");

// This is a sample Buidler task. To learn how to create your own go to
// https://buidler.dev/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.getAddress());
  }
});

//1 foot in 1 foot out lmao
const fs = require('fs');
const infuraKey = fs.readFileSync(".infura").toString().trim();
const alchemyKey = fs.readFileSync(".alchemy").toString().trim();

// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// Go to https://buidler.dev/config/ to learn more
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.13",
        settings:{
          evmVersion: "istanbul",
          optimizer: { enabled: true, runs: 200 }
        }
      },
      {
        version: "0.6.9",
        settings:{
          optimizer: { enabled: true, runs: 200 }
        }
      }
    ]
  },
  networks:{
    coverage: {
      url: 'http://localhost:8555'
    },
    hardhat:{
      allowUnlimitedContractSize:false,
      accounts:walletUtils.localWallet("1000000000000000000000",num=20),
      forking : {
        //url:`https://mainnet.infura.io/v3/${infuraKey}`
        url:`https://eth-mainnet.alchemyapi.io/v2/${alchemyKey}`
      }
    },
    kovan:{
      url:`https://kovan.infura.io/v3/${infuraKey}`,
      accounts:walletUtils.makeKeyList(),
      chainId:42,
      gas: 12500000,
      gasMultiplier:2
    },
    ropsten:{
      url:`https://ropsten.infura.io/v3/${infuraKey}`,
      accounts:walletUtils.makeKeyList(),
      chainId:3,
      gas: 6400000
    },
    maticTest:{
      url: `https://testnet2.matic.network`,
      accounts:walletUtils.makeKeyList(),
      chainId:8995,
      gas: 7000000
    },
    maticBetaMainnet: {
      url:`https://betav2.matic.network`,
      accounts:walletUtils.makeKeyList(),
      network_id: 16110,       // Matic's test network id
      gas: 7000000
    },
    maticTestV3: {
      url:`https://testnetv3.matic.network`,
      accounts:walletUtils.makeKeyList(),
      network_id: 15001
    }
  }
};
