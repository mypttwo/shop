require("dotenv").config();

const wssProvider = process.env.REACT_APP_WSS_PROVIDER;

module.exports = {
  wssProvider,
};
