import axios from "axios";
import "dotenv/config";
import { sdk } from "../config/contract";
import { saveEventToMongoDB } from "./saveEventsToDB";
import { GenAbi, GenAddress } from "../constant/addresses";

// Function for getting the latest block
async function getLatestBlockNumber() {
  try {
    const response = await axios.post(process.env.RPC_URL as string, {
      jsonrpc: "2.0",
      id: 1,
      method: "eth_blockNumber",
      params: [],
    });

    const blockNumberHex = response.data.result;
    const blockNumber = parseInt(blockNumberHex, 16);

    return blockNumber;
  } catch (error) {
    console.error("Error:", error);
  }
}

// With this function you can get all the events emitted in the past this will also save the events to the allEventsData.json
export async function eventsSetup() {
  try {
    const endBlock = await getLatestBlockNumber();

    let fromBlock = 46937258; // Start block
    let batchSize = 1000; // Number of blocks to fetch at a time

    if (endBlock && fromBlock >= endBlock) {
      console.log("No more blocks to process.");
      return;
    }

    while (endBlock && fromBlock < endBlock) {
      let toBlock = fromBlock + batchSize;
      // Adjust the toBlock to not exceed endBlock
      toBlock = Math.min(toBlock, endBlock);

      console.log(`Fetching events from block ${fromBlock} to ${toBlock}`);

      const events = await getEvent({ fromBlock, toBlock });

      if (events) {
        for (let i = 0; i < events.length; i++) {
          const event = events[i];

          await saveEventToMongoDB(event);
        }
      }

      // Updating fromBlock and toBlock for the next iteration
      fromBlock = toBlock + 1;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

async function getEvent({ fromBlock, toBlock }: any) {
  try {
    const contract = await sdk.getContract(GenAddress, GenAbi);

    const filter = {
      fromBlock: fromBlock,
      toBlock: toBlock,
    };

    const events = await contract.events.getAllEvents(filter);

    return events;
  } catch (error) {
    console.log("Error: ", error);
  }
}
