import axios from "axios";
import { getURI } from "../blockchain/erc1155Contract";

const convertIpfsLink = (ipfsLink) => {
  if (ipfsLink.includes("ipfs://ipfs/")) {
    return ipfsLink.replace("ipfs://ipfs/", "https://ipfs.io/ipfs/");
  } else return ipfsLink;
};

const load = async (nft) => {
  try {
    let uri = await getURI(nft.address, nft.tokenId);
    let link = convertIpfsLink(uri);
    console.log(link);
    let resp = await axios.get(link);
    if (resp.status == 200) {
      resp.data.image = convertIpfsLink(resp.data.image);
      console.log(resp.data);
      return resp.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export { load };
