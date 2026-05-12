const MyToken = artifacts.require("MyToken");
const Pool = artifacts.require("Pool");
const GeniosClub = artifacts.require("GeniosClub");

module.exports = function (deployer) {
  let myTokenDeployment;
  deployer
    .deploy(MyToken)
    .then((token) => {
      myTokenDeployment = token;
      return deployer.deploy(Pool, token.address);
    })
    .then(() => {
      return deployer.deploy(
        GeniosClub,
        "0x1FA276453A3Dab1f5F0e61D5e970116A1680A92A",
        myTokenDeployment.address,
        Pool.address,
        "0x1FA276453A3Dab1f5F0e61D5e970116A1680A92A",
        "0x1FA276453A3Dab1f5F0e61D5e970116A1680A92A"
      );
    });
};
