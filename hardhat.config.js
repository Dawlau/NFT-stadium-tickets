/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY, API_KEY } = process.env;
module.exports = {
  defaultNetwork: "ropsten",
  networks: {
    hardhat: {},
    ropsten: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  etherscan: {
  // Your API key for Etherscan
  // Obtain one at https://etherscan.io/
    apiKey: API_KEY
  },
  solidity: "0.8.4",
};