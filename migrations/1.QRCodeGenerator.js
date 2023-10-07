var QRCodeGenerator = artifacts.require("./QRCodeGenerator.sol");

module.exports = function (deployer) {
  deployer.deploy(QRCodeGenerator);
};
