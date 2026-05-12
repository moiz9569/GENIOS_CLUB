const MyToken = artifacts.require("MyToken");

module.exports = async function (callback) {
  const token = await MyToken.at("0xff9e6c7A9dD4cc18007c74083F397dFFbD9466b3");

  const referrerAddress = "0x448868bd0B55C5a8dD194ce72ED6209D96bcaBF1";

  // Call the transfer function to transfer tokens
  const amount = web3.utils.toBN("5000000000000000000");
  await token.transfer(referrerAddress, amount);

  callback();
};
