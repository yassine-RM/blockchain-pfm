const ParityChecker = artifacts.require("ParityChecker");

module.exports = function (deployer) {
  deployer.deploy(ParityChecker);
};
