import React from "react";
import CurrencyAdmin from "../containers/adminCurrency";
import { currencies } from "../data/currency";

const CurrencyPage = (props) => {
  return (
    <>
      <div className="mb-3 h5">Supported Currencies</div>
      <table className="table table-hover table-sm rounded shadow">
        <thead>
          <tr>
            <th className="text-center"> Currency </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency, index) => (
            <CurrencyAdmin currency={currency} key={index} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CurrencyPage;
