import React from "react";
import { getBalance } from "../blockchain/erc1155Contract";
import {
  getPrice,
  savePrice,
  withdrawCurrency,
} from "../blockchain/shopContract";
import { shopAddress } from "../blockchain/shopContractDef";
import { currencies } from "../data/currency";
import getAddressAndTokenId from "../utils/marketUrlParser";
import Web3 from "web3";
import CurrencyAdmin from "./adminCurrency";
import CurrencyPage from "../components/adminCurrencyPage";
import NFTAdmin from "./adminNFT";
import NFTPage from "../components/adminNFTPage";
import { getCurrencyBalance } from "../blockchain/erc20Contract";

let web3 = new Web3(window.web3.currentProvider);

class NFTSetupAdmin extends React.Component {
  state = {
    nftUrl: "",
    newAddress: "",
    newTokenId: "",
    selectedCurrency: currencies[0].address,
    shopBalance: 0,
    price: "",
    newPrice: "",
    shopCurrencyBalance: 0,
    withdrawAmount: 0,
  };

  handleSavePrice = () => {
    savePrice(
      this.state.newAddress,
      this.state.newTokenId,
      this.state.selectedCurrency,
      web3.utils.toWei(this.state.newPrice)
    );
  };
  handleUpdateUrl = (event) => {
    this.setState({ nftUrl: event.target.value });
  };
  handleUpdatePrice = (event) => {
    this.setState({ newPrice: event.target.value });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    let isValid = true;
    switch (name) {
      case "newPrice":
        const regexp = new RegExp(`^-?[0-9]*$`);
        if (!regexp.test(value)) {
          isValid = false;
        }
        break;
      default:
        break;
    }
    if (isValid) {
      this.setState({
        [name]: value,
      });
    }
  };
  handleChangeCurrency = async (event) => {
    debugger;
    let selected = event.target.value;
    let shopCurrencyBalance = await getCurrencyBalance(
      event.target.value,
      shopAddress
    );
    let price = await getPrice(
      this.state.newAddress,
      this.state.newTokenId,
      event.target.value
    );
    this.setState({
      selectedCurrency: selected,
      price: price,
      shopCurrencyBalance: web3.utils.fromWei(`${shopCurrencyBalance}`),
    });
  };
  parseNftUrl = async () => {
    if (this.state.nftUrl) {
      let { address, tokenId } = getAddressAndTokenId(this.state.nftUrl);

      let shopCurrencyBalance = await getCurrencyBalance(
        this.state.selectedCurrency,
        shopAddress
      );
      let balance = await getBalance(address, tokenId, shopAddress);
      let price = await getPrice(address, tokenId, this.state.selectedCurrency);
      this.setState({
        newAddress: address,
        newTokenId: tokenId,
        shopBalance: balance,
        price: price,
        shopCurrencyBalance: web3.utils.fromWei(`${shopCurrencyBalance}`),
      });
    }
  };

  readData = async (address, tokenId) => {
    let shopCurrencyBalance = await getCurrencyBalance(
      this.state.selectedCurrency,
      shopAddress
    );
    let balance = await getBalance(address, tokenId, shopAddress);
    let price = await getPrice(address, tokenId, this.state.selectedCurrency);
    return { balance, price, shopCurrencyBalance };
  };

  setData = async () => {
    let shopCurrencyBalance = await getCurrencyBalance(
      this.state.selectedCurrency,
      shopAddress
    );
    let balance = await getBalance(
      this.state.newAddress,
      this.state.newTokenId,
      shopAddress
    );
    let price = await getPrice(
      this.state.newAddress,
      this.state.newTokenId,
      this.state.selectedCurrency
    );
    this.setState({
      shopBalance: balance,
      price: price,
      shopCurrencyBalance: web3.utils.fromWei(`${shopCurrencyBalance}`),
    });
  };

  withdrawAmount = async () => {
    await withdrawCurrency(
      this.state.selectedCurrency,
      web3.utils.toWei(this.state.withdrawAmount)
    );
  };
  addCurrencyFormJsx = () => {
    let saveBtnJsx = (
      <>
        <label className="form-label">Update Price</label>
        <div class="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={this.state.newPrice}
            onChange={this.handleUpdatePrice}
            placeholder="Enter Price"
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            onClick={this.handleSavePrice}
          >
            Save Price
          </button>
        </div>
      </>
    );
    let withdrawBtnJsx = (
      <>
        <label className="form-label">Withdraw Currency</label>
        <div class="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={this.state.withdrawAmount}
            name="withdrawAmount"
            onChange={this.handleChange}
            placeholder="Enter Amount"
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            onClick={this.withdrawAmount}
          >
            Withdraw
          </button>
        </div>
      </>
    );

    return (
      <form>
        <div className="mb-3 h4">Setup NFT Price</div>
        <div className="mb-3">
          <div className="input-group ">
            <input
              type="text"
              className="form-control"
              placeholder="Open Sea/Rarible url of NFT"
              onChange={this.handleUpdateUrl}
              value={this.state.nftUrl}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={this.parseNftUrl}
            >
              Parse
            </button>
          </div>
        </div>

        <div className="mb-3">
          <form>
            <div className="row align-items-center g-3">
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.newAddress}
                  placeholder="Address"
                  name="newAddress"
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-2">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.newTokenId}
                  placeholder="TokenId"
                  name="newTokenId"
                  onChange={this.handleChange}
                />
              </div>
              <div className="col">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.setData}
                >
                  Read Data
                </button>
              </div>
            </div>
            <div className="row align-items-center g-3">
              <div className="col">
                <div className="my-3">
                  The shop has {this.state.shopBalance} items in stock
                </div>
              </div>
            </div>

            <div className="row  align-items-center g-3">
              <div className="col-4">
                <label className="form-label">Select Currency</label>
                <select
                  className="form-select"
                  value={this.state.selectedCurrency}
                  onChange={this.handleChangeCurrency}
                >
                  {currencies.map((c) => (
                    <option value={c.address}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-4 text-center">
                <label className="form-label">Current Price</label>
                <div>{web3.utils.fromWei(this.state.price)}</div>
              </div>
              <div className="col-4 text-center">
                <label className="form-label">Currency Balance</label>
                <div>{this.state.shopCurrencyBalance}</div>
              </div>
            </div>
            <div className="row  align-items-center g-3 mt-3">
              <div className="col-4">{saveBtnJsx}</div>
              <div className="col-4"></div>
              <div className="col-4">{withdrawBtnJsx}</div>
            </div>
          </form>
        </div>
      </form>
    );
  };
  render() {
    return (
      <div>
        <div className="container">
          <div className="row mt-5">
            <div className="col-8">{this.addCurrencyFormJsx()}</div>
            <div className="col"></div>
            <div className="col"></div>
          </div>
          <div className="row mt-5">
            <div className="col-8">
              <div className="h4">Configuration Data</div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-8">
              <NFTPage></NFTPage>
            </div>
            <div className="col"></div>
            <div className="col"></div>
          </div>
          <div className="row mt-2">
            <div className="col-8">
              <CurrencyPage></CurrencyPage>
            </div>
            <div className="col"></div>
            <div className="col"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default NFTSetupAdmin;
