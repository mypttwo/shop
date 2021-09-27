import React from "react";
import {
  getCurrencyBalance,
  getTokenData,
  mint,
  setAllowance,
} from "../blockchain/erc20Contract";
import { buy, getPrice, setupShopListener } from "../blockchain/shopContract";
import { shopAddress } from "../blockchain/shopContractDef";
import { connectWallet } from "../utils/metamask";
import Web3 from "web3";

let web3 = new Web3(window.web3.currentProvider);

class BuyWithCurrencyForm extends React.Component {
  state = {
    name: "",
    symbol: "",
    price: 0,
    qty: "",
    status: "",
    shopListener: null,
    currencyBalance: 0,
  };

  async componentDidMount() {
    let { name, symbol } = await getTokenData(this.props.currency.address);
    let walletConnection = await connectWallet();
    let currencyBalance = await getCurrencyBalance(
      this.props.currency.address,
      walletConnection.address
    );
    let price = await getPrice(
      this.props.nft.address,
      this.props.nft.tokenId,
      this.props.currency.address
    );
    let shopListener = setupShopListener(this.handlePriceUpdateEvent);
    this.setState({
      name: name,
      symbol: symbol,
      price: web3.utils.fromWei(`${price}`),
      // shopListener: shopListener,
      currencyBalance: web3.utils.fromWei(`${currencyBalance}`),
    });
  }
  handlePriceUpdateEvent = async (error, event) => {
    if (error) {
      console.error("error PriceUpdate", error);
    }
    if (event && event.returnValues.price) {
      console.log("price", event.returnValues.price);

      setTimeout(async () => {
        let price = await getPrice(
          this.props.nft.address,
          this.props.nft.tokenId,
          this.props.currency.address
        );
        this.setState(
          {
            price: web3.utils.fromWei(`${price}`),
          },
          console.log("updated price", this.state.price)
        );
      }, 10 * 1000);
    }
  };
  buyItem = async () => {
    if (!this.state.qty) {
      return this.setState({ status: "Quantity cannot be 0!" });
    }
    let walletConnection = await connectWallet();
    if (walletConnection.status.includes("Error")) {
      return this.setState({ status: walletConnection.status });
    }
    try {
      await setAllowance(
        this.props.currency.address,
        walletConnection.address,
        shopAddress
      );
      await buy(
        this.props.nft.address,
        this.props.nft.tokenId,
        this.props.currency.address,
        this.state.qty
      );
    } catch (error) {
      console.error(error);
    }
  };
  handleUpdate = (event) => {
    this.setState({ qty: event.target.value });
  };
  render() {
    if (this.state.price == 0) {
      return <></>;
    }
    return (
      <div className="col" style={{ maxWidth: "20rem" }}>
        <div
          className="card rounded-5 shadow-sm text-center"
          style={{ backgroundColor: "#181818" }}
        >
          <div className="mt-3" style={{ backgroundColor: "#181818" }}>
            {/* Buy with{" "} */}
            <img
              src={this.props.currency.logo}
              className=""
              style={{ maxWidth: "25px" }}
            ></img>{" "}
            <span className="fs-6">{this.state.name}</span>
            <div className="small mt-2" style={{ fontSize: ".7rem" }}>
              Balance : {this.state.currencyBalance} {this.state.symbol}
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title pricing-card-title">
              {this.state.price} {this.state.symbol}
              <small className="text-muted fw-light">/item</small>
            </h5>

            <div className="input-group pt-3">
              <input
                type="number"
                min="0"
                step="1"
                pattern="[0-9]"
                className="form-control"
                placeholder="Quantity"
                value={this.state.qty}
                onChange={this.handleUpdate}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.buyItem}
              >
                Buy
              </button>
            </div>
            <div className="mt-3 text-warning" style={{ fontSize: ".8rem" }}>
              {this.state.status}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BuyWithCurrencyForm;
