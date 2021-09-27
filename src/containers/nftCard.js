import React from "react";
import { getBalance } from "../blockchain/erc1155Contract";
import { setupShopListener } from "../blockchain/shopContract";
import { shopAddress } from "../blockchain/shopContractDef";
import Links from "../components/links";
import { currencies } from "../data/currency";
import { open_sea, rarible } from "../utils/logos";
import { connectWallet } from "../utils/metamask";
import { load } from "../utils/nftDataLoader";
import BuyWithCurrencyForm from "./buyFormCard";

class NFTCard extends React.Component {
  state = {
    nftData: null,
    balance: 0,
    shopBalance: 0,
    shopListener: null,
  };
  async componentDidMount() {
    let nftData = await load(this.props.nft);
    let walletConnection = await connectWallet();
    try {
      let balance = await getBalance(
        this.props.nft.address,
        this.props.nft.tokenId,
        walletConnection.address
      );
      let shopBalance = await getBalance(
        this.props.nft.address,
        this.props.nft.tokenId,
        shopAddress
      );
      let shopListener = setupShopListener(
        this.handlePriceUpdateEvent,
        this.handleBoughtEvent
      );
      if (nftData) {
        this.setState({
          nftData: nftData,
          balance: balance,
          shopBalance: shopBalance,
          shopListener: shopListener,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  handleBoughtEvent = async (error, event) => {
    if (error) {
      console.error("error Bought", error);
    }
    if (event && event.returnValues.buyerAddress) {
      console.log("buyerAddress", event.returnValues.buyerAddress);
      setTimeout(async () => {
        let walletConnection = await connectWallet();
        let balance = await getBalance(
          this.props.nft.address,
          this.props.nft.tokenId,
          walletConnection.address
        );
        let shopBalance = await getBalance(
          this.props.nft.address,
          this.props.nft.tokenId,
          shopAddress
        );
        this.setState(
          {
            balance: balance,
            shopBalance: shopBalance,
          },
          console.log(this.state)
        );
      }, 10 * 1000);
    }
  };
  handlePriceUpdateEvent = (error, event) => {
    if (error) {
      console.error("error PriceUpdate", error);
    }
    if (event && event.returnValues.price) {
      console.log("price", event.returnValues.price);
    }
  };
  render() {
    let cardJsx = <></>;
    if (this.state.nftData) {
      let imageJsx = <></>;
      let titleJsx = <></>;
      imageJsx = (
        <img
          src={this.state.nftData.image}
          className="card-img-top fade-in"
          alt="..."
        />
      );
      titleJsx = <div className="card-title h5">{this.state.nftData.name}</div>;
      cardJsx = (
        <div
          className="card fade-in"
          style={{ maxWidth: "36rem", backgroundColor: "black" }}
        >
          {imageJsx}
          <div className="card-body">
            {titleJsx}
            <p className="card-text">{this.state.nftData.description}</p>
            <hr className="text-secondary" />
            <p className="card-text text-center">
              Find unlocked content in popular marketplaces!
            </p>
            <Links nft={this.props.nft}></Links>
            {/* </div> */}
            <hr className="text-secondary" />
            <div className="h6 text-center mt-3">
              Buy {this.state.nftData.name} Items
            </div>
            {/* <div className="card-body"> */}
            <div style={{ fontSize: ".8rem" }}>
              <div>There are {this.state.shopBalance} items available </div>
              <div>You own {this.state.balance} items </div>
            </div>

            <div className="row mt-3 text-center d-flex justify-content-center">
              {currencies.map((c, index) => {
                return (
                  <BuyWithCurrencyForm
                    key={index}
                    currency={c}
                    nft={this.props.nft}
                  />
                );
              })}
            </div>
            {/* <CurrencyBtnBar></CurrencyBtnBar> */}
          </div>
        </div>
      );
    }
    return <div className="col">{cardJsx}</div>;
  }
}

export default NFTCard;
