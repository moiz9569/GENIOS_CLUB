import { ethers, Contract } from "ethers";
import { GenAbi, GenAddress } from "../constant/addresses";
import { USER, User } from "../models/user";
import { updateAllSeventhLevels } from "../functions/updateLevels";
import { MATRIX } from "../models/matrix";

export const events = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.JSON_RPC_URI
  );
  const contract = new Contract(GenAddress, GenAbi, provider);

  contract.on('UserAdd', async (user, ref, level, event) => {
    if (Number(level) === 1) return add(user, ref);
    upgrade(user, ref, Number(level - 1));
  });
};

const add = async (userAddress: string, curRefAdd: string) => {
  try {
    const newUser = new USER({
      address: userAddress,
      referrer: curRefAdd,
    });
    newUser.activeLevels[0] = true;
    await newUser.save();

    const newUserMatrix = new MATRIX({
      code: `${0}-${userAddress}`,
      level: 0,
      address: userAddress,
      referrer: curRefAdd,
      currentReferrer: curRefAdd,
    });
    const savedUserMatrix = await newUserMatrix.save();
    await updateAllSeventhLevels(savedUserMatrix, curRefAdd, 0);
  } catch (error) {
    console.log('file: user.ts:47  registration  error:', error);
  }
};

const upgrade = async (
  userAddress: string,
  curRefAdd: string,
  level: number
) => {
  try {
    const user: User | null = await USER.findOne({
      address: userAddress,
      level,
    });

    if (!user)
      return console.log({
        message:
          "user not found & level already active & level is out of bound.",
      });

    user.activeLevels[Number(level)] = true;
    await user.save();

    const newUserMatrix = new MATRIX({
      code: `${level}-${userAddress}`,
      level,
      address: userAddress,
      currentReferrer: curRefAdd,
    });
    const savedUserMatrix = await newUserMatrix.save();
    await updateAllSeventhLevels(savedUserMatrix, curRefAdd, Number(level));
  } catch (error) {
    console.log("file: user.ts:47  registration  error:", error);
  }
};
