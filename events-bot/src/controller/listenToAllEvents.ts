import 'dotenv/config';
import { Abi, Address } from '../utils/contract';
import { sdk } from '../config/contract';
import { saveEventToMongoDB } from './saveEventsToDB';

// This function listens to all the events emitted form the smart contract and will save the events to allEventsData.json

export async function listenToAllEvents() {
  console.log('Listening to events...');
  try {
    const contract = await sdk.getContract(Address, Abi);
    contract.events.listenToAllEvents(async (event) => {
      if (event) {
        await saveEventToMongoDB(event);
      }
    });
  } catch (error) {
    console.log('Error while listening to all Events: ', error);
  }
}
