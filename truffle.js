var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "find pottery venture category umbrella hollow exotic brain floor habit shoulder city";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function() { 
       return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/afa575ca8864454e9efd244a886baabb");
      },
      network_id: 4,
      // gas: 4500000,
      // gasPrice: 10000000000,
    }
  },
  compilers: {
    solc: {
      version: "^0.4.24"
    }
  }
};