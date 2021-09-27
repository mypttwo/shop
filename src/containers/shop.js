import React from "react";
import nfts from "../data/nft";
import NFTCard from "./nftCard";

class Shop extends React.Component {
  state = {
    nfts: nfts,
  };

  render() {
    return (
      <div className="container my-5">
        <div className="row row-cols-1 row-cols-md-2 g-5">
          {this.state.nfts.map((nft, index) => (
            <NFTCard nft={nft} key={index}></NFTCard>
          ))}
        </div>
      </div>
    );
  }
}

export default Shop;
