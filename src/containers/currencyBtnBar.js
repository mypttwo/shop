import React from "react";

import { currencies } from "../data/currency";

class CurrencyBtnBar extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          {currencies.map((currency, index) => {
            return (
              <div className="col-3" key={index}>
                <button
                  type="button"
                  className="btn btn-sm rounded btn-outline-dark my-1 border-0 border-dark hvr-grow p-2"
                  // onClick={() => this.props.selectCurrency(currency.address)}
                >
                  <img src={currency.logo} style={{ width: "40px" }}></img>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CurrencyBtnBar;
