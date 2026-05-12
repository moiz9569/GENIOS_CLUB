import { BigNumber, utils } from "ethers";

/**
 * USDT (6 decimals) → readable string
 */
export function UseFormatUSDT(value?: BigNumber) {
  if (!value) return "0";
  return utils.formatUnits(value, 6);
}

/**
 * USDT (6 decimals) → number
 */
export function UseFormatUSDTNumber(value?: BigNumber) {
  if (!value) return 0;
  return Number(utils.formatUnits(value, 6));
}

/**
 * Safe number conversion (for IDs, counts, etc.)
 */
export function UseFormatNumber(value?: any) {
  if (!value) return 0;
  return Number(value.toString());
}