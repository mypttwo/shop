import React from "react";
import { open_sea, rarible } from "../utils/logos";

const Links = (props) => {
  let oslinkJsx = <></>;
  if (props.nft.oslink) {
    oslinkJsx = (
      <a href={props.nft.oslink} target="_blank">
        <img
          src={open_sea}
          style={{ maxWidth: "80px" }}
          alt={props.nft.oslink}
        />
      </a>
    );
  }
  let rariblelinkJsx = <></>;
  if (props.nft.rariblelink) {
    rariblelinkJsx = (
      <a href={props.nft.rariblelink} target="_blank">
        <img
          className="rounded"
          src={rarible}
          style={{ maxWidth: "30px" }}
          alt={props.nft.rariblelink}
        />
      </a>
    );
  }
  return (
    <div className="d-flex justify-content-evenly">
      {oslinkJsx}
      {rariblelinkJsx}
    </div>
  );
};

export default Links;
