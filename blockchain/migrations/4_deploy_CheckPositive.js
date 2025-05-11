const CheckPositive = artifacts.require("CheckPositive");

module.exports = function (deployer) {
  deployer.deploy(CheckPositive);
};
