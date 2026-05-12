import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';
import { ActiveChain } from '../constant/addresses';

export const provider = new ethers.providers.JsonRpcProvider(
  process.env.RPC_URL
);

// sdk Setup, you will need clientId and secretKey for the sdk you can get this from thirdweb
export const sdk = new ThirdwebSDK(ActiveChain, {
  clientId: process.env.CLIENT_ID,
  secretKey: process.env.SECRET_KEY,
});
