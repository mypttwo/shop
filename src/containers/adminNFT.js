import React from "react";
import { getTokenData } from "../blockchain/erc20Contract";

class NFTAdmin extends React.Component {
  async componentDidMount() {}

  render() {
    return (
      <tr>
        <td className="text-truncate pb-4">
          <div style={{ fontSize: ".9rem" }}>
            {this.props.nft.address} : {this.props.nft.tokenId}
          </div>
          <div style={{ fontSize: ".6rem" }}>{this.props.nft.rariblelink}</div>
          <div style={{ fontSize: ".6rem" }}>{this.props.nft.oslink}</div>
        </td>
        <td></td>
      </tr>
    );
  }
}

export default NFTAdmin;
