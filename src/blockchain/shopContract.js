import Web3 from "web3";
import { connectWallet } from "../utils/metamask";
import { shopAbi, shopAddress } from "./shopContractDef";
import { wssProvider } from "../config";
import erc1155abi from "./erc1155abi";

let web3 = new Web3(window.web3.currentProvider);

const setupContractForWallet = (address) => {
  let web3 = new Web3(window.web3.currentProvider);
  let contract = new web3.eth.Contract(shopAbi, address);
  return contract;
};

const setupShopListener = (priceUpdateHandler, boughtHandler) => {
  let web3 = new Web3(new Web3.providers.WebsocketProvider(wssProvider));
  let shopContract = new web3.eth.Contract(shopAbi, shopAddress);
  //setup events here
  shopContract.events.PriceUpdate((error, event) => {
    if (priceUpdateHandler) {
      priceUpdateHandler(error, event);
    }
  });
  shopContract.events.Bought(async (error, event) => {
    if (boughtHandler) {
      boughtHandler(error, event);
    }
  });

  return shopContract;
};

const getPrice = async (nftAddress, tokenId, currencyAddress) => {
  try {
    let contract = await setupContractForWallet(shopAddress);
    let price = await contract.methods
      .priceMapping(nftAddress, tokenId, currencyAddress)
      .call();

    return price;
  } catch (error) {
    console.error(error);
  }

  return null;
};

const savePrice = async (nftAddress, tokenId, currencyAddress, price) => {
  try {
    let contract = await setupContractForWallet(shopAddress);
    let walletConnection = await connectWallet();
    let resp = await contract.methods
      .setPrice(nftAddress, tokenId, currencyAddress, price)
      .send({ from: walletConnection.address });
    console.log(resp);
  } catch (error) {
    console.error(error);
  }

  return null;
};

const buy = async (nftAddress, tokenId, currencyAddress, amount) => {
  try {
    let contract = await setupContractForWallet(shopAddress);
    let walletConnection = await connectWallet();
    let resp = await contract.methods
      .buy(nftAddress, tokenId, currencyAddress, amount)
      .send({ from: walletConnection.address });
    console.log(resp);
  } catch (error) {
    console.error(error);
  }

  return null;
};

const getValue = async (nftAddress, tokenId, currencyAddress, amount) => {
  try {
    let contract = await setupContractForWallet(shopAddress);
    let walletConnection = await connectWallet();

    let resp = await contract.methods
      .getValue(nftAddress, tokenId, currencyAddress, amount)
      .call({ from: walletConnection.address });
    console.log(resp);
  } catch (error) {
    console.error(error);
  }

  return null;
};

const withdrawCurrency = async (currencyAddress, amount) => {
  try {
    let contract = await setupContractForWallet(shopAddress);
    let walletConnection = await connectWallet();

    let resp = await contract.methods
      .withdraw(currencyAddress, amount)
      .send({ from: walletConnection.address });
    console.log(resp);
  } catch (error) {
    console.error(error);
  }

  return null;
};

export {
  setupContractForWallet,
  getPrice,
  savePrice,
  buy,
  getValue,
  setupShopListener,
  withdrawCurrency,
};
