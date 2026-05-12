import { formatUnits, parseUnits } from 'ethers/lib/utils';

export const formatUSDT = (value) => formatUnits(value || 0, 6);
export const parseUSDT = (value) => parseUnits(value, 6);