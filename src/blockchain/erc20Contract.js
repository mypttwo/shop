import Web3 from "web3";
import { connectWallet } from "../utils/metamask";
import erc20abi from "./erc20abi";

const setupContractForWallet = (erc20Address) => {
  let web3 = new Web3(window.web3.currentProvider);
  let contract = new web3.eth.Contract(erc20abi, erc20Address);
  return contract;
};

const getTokenData = async (erc20Address) => {
  try {
    let contract = await setupContractForWallet(erc20Address);
    let name = await contract.methods.name().call();
    let symbol = await contract.methods.symbol().call();
    return { name, symbol };
  } catch (error) {
    console.error(error);
  }

  return null;
};
const setAllowance = async (erc20Address, ownerAddress, spenderAddress) => {
  let erc20 = await setupContractForWallet(erc20Address);
  let allowance = await erc20.methods
    .allowance(ownerAddress, spenderAddress)
    .call();
  console.log(allowance);
  if (allowance == 0) {
    let web3 = new Web3(window.web3.currentProvider);
    await erc20.methods
      .approve(spenderAddress, web3.utils.toWei(`${100000}`))
      .send({ from: ownerAddress });
  }
};

const getCurrencyBalance = async (erc20Address, ownerAddress) => {
  try {
    let contract = await setupContractForWallet(erc20Address);
    let balance = await contract.methods.balanceOf(ownerAddress).call();
    console.log(balance);
    return balance;
  } catch (error) {
    console.error(error);
  }
  return null;
};

//debugging purposes only
const mint = async (erc20Address) => {
  let erc20 = await setupContractForWallet(erc20Address);
  let walletConnection = await connectWallet();
  for (let x = 0; x < 10; x++) {
    await erc20.methods.mint().send({ from: walletConnection.address });
  }
};

export {
  setupContractForWallet,
  getTokenData,
  setAllowance,
  getCurrencyBalance,
  mint,
};
