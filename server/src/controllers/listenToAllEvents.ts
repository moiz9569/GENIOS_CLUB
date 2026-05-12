import { saveEventToMongoDB } from './saveEventsToDB';
import { GenAbi, GenAddress } from '../constant/addresses';
import { sdk } from '../config/contract';

// This function listens to all the events emitted form the smart contract and will save the events to allEventsData.json

export async function listenToAllEvents() {
  console.log('Listening to events...');
  try {
    const contract = await sdk.getContract(GenAddress, GenAbi);

    contract.events.listenToAllEvents(async (event) => {
      if (event) {
        await saveEventToMongoDB(event);
      }
    });
  } catch (error) {
    console.log('Error while listening to all Events: ', error);
  }
}
