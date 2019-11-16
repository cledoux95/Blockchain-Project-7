// migrating the appropriate contracts
// var MusicianRole = artifacts.require("./MusicianRole.sol");
// var ProducerRole = artifacts.require("./ProducerRole.sol");
// var DistributorRole = artifacts.require("./DistributorRole.sol");
// var ListenerRole = artifacts.require("./ListenerRole.sol");
var SupplyChain = artifacts.require("./SupplyChain.sol");

module.exports = function(deployer) {
  // deployer.deploy(MusicianRole);
  // deployer.deploy(ProducerRole);
  // deployer.deploy(DistributorRole);
  // deployer.deploy(ListenerRole);
  deployer.deploy(SupplyChain);
};
