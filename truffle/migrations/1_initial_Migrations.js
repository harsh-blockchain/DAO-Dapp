var daoContract = artifacts.require("daoContract");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(daoContract);
};
