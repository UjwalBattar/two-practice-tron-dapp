const utils = {
  tronWeb: false,
  contract: false,

  setTronWeb(tronWeb) {
    this.tronWeb = tronWeb;
    // this.contract = await tronWeb.contract().at(contractAddress);
  },

  async setContract(tronWeb, contractAddress) {
    this.contract = await tronWeb.contract().at(contractAddress);
  }
};

export default utils;
