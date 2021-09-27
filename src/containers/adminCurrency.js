import React from "react";
import { getTokenData } from "../blockchain/erc20Contract";

class CurrencyAdmin extends React.Component {
  state = {
    name: "",
    symbol: "",
  };

  async componentDidMount() {
    let { name, symbol } = await getTokenData(this.props.currency.address);
    this.setState({
      name: name,
      symbol: symbol,
    });
  }

  render() {
    return (
      <tr>
        <td>
          <div className="text-truncate" style={{ fontSize: ".9rem" }}>
            <img
              src={this.props.currency.logo}
              className="m-3"
              style={{ maxWidth: "35px" }}
            ></img>
            {this.props.currency.address} {this.state.name} ({this.state.symbol}
            )
          </div>
          <div></div>
        </td>
        <td></td>
      </tr>
    );
  }
}

export default CurrencyAdmin;
