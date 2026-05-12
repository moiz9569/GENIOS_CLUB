import { ethers } from "ethers";

export const formatEarnings = (value: any) => {
  if (!value) return "0";

  return ethers.utils.formatUnits(value.toString(), 6);
};