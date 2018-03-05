import * as Web3 from "web3";
import { Web3Wrapper } from "@0xproject/web3-wrapper";
import { BigNumber, promisify } from "@0xproject/utils";

import provider from "./provider";
import humanTokenABI from "./humanStandardTokenABI";

const web3 = new Web3(provider);
const web3Wrapper = new Web3Wrapper(web3.currentProvider);
const erc20Token = web3Wrapper.getContractFromAbi(humanTokenABI);

export async function getBalance(
  contractAddress: string,
  address: string
): Promise<number> {
  const balance = await promisify<BigNumber>(
    erc20Token.at(contractAddress).balanceOf
  )(address);
  return balance.toNumber();
}

export default web3;
