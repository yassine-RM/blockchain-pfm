const Rectangle = artifacts.require("Rectangle");

module.exports = function (deployer) {
  const x = 10;
  const y = 20;
  const longueur = 5;
  const largeur = 3;
  deployer.deploy(Rectangle, x, y, longueur, largeur);
};
