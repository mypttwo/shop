import Web3 from "web3";
import erc1155abi from "./erc1155abi";

const setupContractForWallet = (erc1155Address) => {
  let web3 = new Web3(window.web3.currentProvider);
  let contract = new web3.eth.Contract(erc1155abi, erc1155Address);
  return contract;
};

const getBalance = async (erc1155Address, erc1155TokenId, ownerAddress) => {
  try {
    let contract = await setupContractForWallet(erc1155Address);
    let balance = await contract.methods
      .balanceOf(ownerAddress, erc1155TokenId)
      .call();
    console.log(balance);
    return balance;
  } catch (error) {
    console.error(error);
  }
  return null;
};

const getURI = async (erc1155Address, erc1155TokenId) => {
  let contract = await setupContractForWallet(erc1155Address);
  let uri = await contract.methods.uri(erc1155TokenId).call();
  return uri;
};

export { setupContractForWallet, getBalance, getURI };
