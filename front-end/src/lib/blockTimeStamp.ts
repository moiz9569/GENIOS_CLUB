import { ethers } from "ethers";

export async function timeStamp(blockNumber: any) {
  const providerUrl = "https://rpc.sepolia.org";

  const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  try {
    const block = await provider.getBlock(blockNumber);

    if (!block) return null;

    const timestamp = block.timestamp * 1000;

    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  } catch (error) {
    console.error("Error retrieving block:", error);
    return null;
  }
}










// import { ethers } from "ethers";

// export async function timeStamp(blockNumber: any) {
//   const providerUrl =
//     "https://polygon.rpc.thirdweb.com/";
//   const provider = new ethers.providers.JsonRpcProvider(providerUrl);
//   try {
//     const block = await provider.getBlock(blockNumber);
//     const timestamp = block.timestamp;

//     const blockTimestamp = timestamp;

//     const timestampInMilliseconds = blockTimestamp * 1000;

//     const date = new Date(timestampInMilliseconds);
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const day = date.getDate().toString().padStart(2, "0");
//     const hours = date.getHours().toString().padStart(2, "0");
//     const minutes = date.getMinutes().toString().padStart(2, "0");
   

//     const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;

//     return formattedDateTime;
//   } catch (error) {
//     console.error("Error retrieving block:", error);
//     return null;
//   }
// }

