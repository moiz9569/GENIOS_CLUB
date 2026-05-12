import { GENEVENT } from '../models/event';

export async function saveEventToMongoDB(event: any) {
  try {
    // Save the event to the database
    const newEvent = new GENEVENT({
      eventName: event.eventName,
      data: JSON.stringify(event.data),
      blockHash: event.transaction.blockHash,
      blockNumber: event.transaction.blockNumber,
      transactionHash: event.transaction.transactionHash,
    });
    await newEvent.save();

    console.error('Event saved to MongoDB successfully:', newEvent.eventName);
  } catch (error) {
    console.error('Error saving event to MongoDB:', error);
  }
}
