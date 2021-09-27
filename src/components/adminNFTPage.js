import React from "react";
import NFTAdmin from "../containers/adminNFT";
import nfts from "../data/nft";

const NFTPage = (props) => {
  return (
    <>
      <div className="mb-3 h5">Listed NFTs</div>
      <table className="table table-hover table-sm rounded shadow">
        <thead>
          <tr>
            <th className="text-center"> NFT </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {nfts.map((nft, index) => (
            <NFTAdmin nft={nft} key={index} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default NFTPage;
