import * as Web3 from "web3";

export default new Web3.providers.HttpProvider(
  `https://mainnet.infura.io/${process.env.UNFURA_API_KEY}`
);
