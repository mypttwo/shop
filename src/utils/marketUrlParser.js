const getAddressAndTokenId = (urlStr) => {
  let url = new URL(urlStr);

  let ant = url.pathname.replace("/assets/", "").replace("/token/", "");

  let result = ant.split(/\/|:/);
  console.log(result);
  return { address: result[0], tokenId: result[1] };
};

getAddressAndTokenId(
  "https://opensea.io/assets/0x09e71f7ea5b3996d534268acf2953871c730b446/1"
);

getAddressAndTokenId(
  "https://rarible.com/token/0x09e71f7ea5b3996d534268acf2953871c730b446:1?tab=owners"
);

export default getAddressAndTokenId;
