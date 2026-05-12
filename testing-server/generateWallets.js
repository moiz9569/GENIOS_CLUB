const ethers = require("ethers");
const fs = require("fs-extra");

async function generateWallets(count) {
  try {
    const wallets = [];
    for (let i = 0; i < count; i++) {
      const wallet = ethers.Wallet.createRandom();
      wallets.push({
        address: wallet.address,
        privateKey: wallet.privateKey,
      });

      console.log(i, wallet.address);
    }
    return wallets;
  } catch (error) {
    console.log("file: generateWallets.js:18  generateWallets  error:", error);
  }
}

async function saveWalletsToFile(wallets) {
  try {
    await fs.outputJson("wallets.json", wallets);
    console.log("Wallets saved to wallets.json");
  } catch (error) {
    console.log(
      "file: generateWallets.js:27  saveWalletsToFile  error:",
      error
    );
  }
}

async function main() {
  try {
    const walletCount = 4000;
    const wallets = await generateWallets(walletCount);
    await saveWalletsToFile(wallets);
  } catch (error) {
    console.log("file: generateWallets.js:40  main  error:", error);
  }
}

main();
