const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // Get the provider object
  const provider = ethers.provider;

  // Send a transaction
  const tx = await deployer.sendTransaction({
    to: "0x35BE110a0eaA469553718d1f4eb06e8808b614bF",
    value: ethers.utils.parseEther("1.0"),
  });

  // Get the transaction receipt
  const receipt = await provider.getTransactionReceipt(tx.hash);

  // Print receipt and transaction details
  console.log("Transaction Hash:", tx.hash);
  console.log("Block Number:", receipt.blockNumber);
  console.log("Gas Used:", receipt.gasUsed.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
