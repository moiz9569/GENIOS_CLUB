import { Request, Response } from "express";
import { IMatrix, MATRIX } from "../models/matrix";
import {
  getFifthLevelRef,
  getFirstLevelRef,
  getFourthLevelRef,
  getSecondLevelRef,
  getSixthLevelRef,
  getThirdLevelRef,
} from "../functions/getLevelrefs";
import { updateAllSeventhLevels } from "../functions/updateLevels";
import { USER, User } from "../models/user";

export const view = async (req: Request, res: Response) => {
  try {
    const { level, address } = req.params;
    const referrer = await MATRIX.findOne({ address, level });

    if (!referrer)
      return res.status(401).json({
        message: "referrer not found.",
      });

    res.status(200).json(referrer);
  } catch (e: any) {
    console.error("Error:", e.message);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};

export const getAdd = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;

    const ref: User | null = await USER.findOne({
      address: address,
      level: 0,
    });
    if (!ref)
      return res.status(401).json({
        message: "ref not found.",
      });

    const activeRefAdd: any = await findActiveReferrer(ref, 0);
    const curRefAdd: any = await updateX12Referrer(activeRefAdd, 0);

    res.status(200).json({ currentReferrer: curRefAdd });
  } catch (error) {
    console.log("file: user.ts:47  registration  error:", error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};

export const getUpgrade = async (req: Request, res: Response) => {
  try {
    const { level, address } = req.params;

    const user: User | null = await USER.findOne({
      address: address,
      level,
    });

    if (
      !user ||
      !user.activeLevels[Number(level) - 1] ||
      user.activeLevels[Number(level)] ||
      Number(level) >= 8
    )
      return res.status(401).json({
        message:
          "ref not found & level already active & level is out of bound.",
      });

    const activeRefAdd: any = await findActiveReferrer(user, Number(level));
    const curRefAdd = await updateX12Referrer(activeRefAdd, Number(level));
    console.log("file: matrix.ts:81  getUpgrade  curRefAdd:", curRefAdd);

    res.status(200).json({ currentReferrer: curRefAdd });
  } catch (error) {
    console.log("file: user.ts:47  registration  error:", error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};

export const add = async (req: Request, res: Response) => {
  try {
    const { userAddress, referrerAddress } = req.body;

    const ref: User | null = await USER.findOne({
      address: referrerAddress,
      level: 0,
    });

    if (!ref)
      return res.status(401).json({
        message: "ref not found.",
      });

    const activeRefAdd: any = await findActiveReferrer(ref, 0);
    const curRefAdd = await updateX12Referrer(activeRefAdd, 0);

    const newUser = new USER({
      address: userAddress,
      referrer: referrerAddress,
    });
    newUser.activeLevels[0] = true;
    const savedUser = await newUser.save();

    const newUserMatrix = new MATRIX({
      code: `${0}-${userAddress}`,
      level: 0,
      address: userAddress,
      referrer: referrerAddress,
      currentReferrer: curRefAdd,
    });
    const savedUserMatrix = await newUserMatrix.save();
    await updateAllSeventhLevels(savedUserMatrix, curRefAdd, 0);

    res.status(200).json({ user: savedUser, matrix: savedUserMatrix });
  } catch (error) {
    console.log("file: user.ts:47  registration  error:", error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};

export const upgrade = async (req: Request, res: Response) => {
  try {
    const { level } = req.params;
    const { userAddress } = req.body;

    const user: User | null = await USER.findOne({
      address: userAddress,
      level,
    });

    if (
      !user ||
      !user.activeLevels[Number(level) - 1] ||
      user.activeLevels[Number(level)] ||
      Number(level) >= 8
    )
      return res.status(401).json({
        message:
          "user not found & level already active & level is out of bound.",
      });

    const activeRefAdd: any = await findActiveReferrer(user, Number(level));
    const curRefAdd = await updateX12Referrer(activeRefAdd, Number(level));

    user.activeLevels[Number(level)] = true;
    const savedUser = await user.save();

    const newUserMatrix = new MATRIX({
      code: `${level}-${userAddress}`,
      level,
      address: userAddress,
      currentReferrer: curRefAdd,
    });
    const savedUserMatrix = await newUserMatrix.save();
    await updateAllSeventhLevels(savedUserMatrix, curRefAdd, Number(level));

    res.status(200).json({ user: savedUser, matrix: savedUserMatrix });
  } catch (error) {
    console.log("file: user.ts:47  registration  error:", error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};

async function findActiveReferrer(ref: User, level: number) {
  try {
    let referrer: User | null = ref;

    while (true) {
      if (!referrer) {
        return console.log("referrer not found");
      }

      if (referrer.activeLevels[level]) {
        return referrer.address;
      }

      referrer = await USER.findOne({
        address: referrer.referrer,
        level,
      });
    }
  } catch (error) {
    console.log("file: matrix.ts:101  findActiveReferrer  error:", error);
  }
}

async function updateX12Referrer(referrerAddress: string, level: number) {
  try {
    const referrer: IMatrix | null = await MATRIX.findOne({
      address: referrerAddress,
      level,
    });

    if (!referrer) {
      return console.log("Second level ref not found");
    }

    if (referrer.firstLevel.length < 3) {
      return referrer.address;
    } else if (referrer.secondLevel.length < 9) {
      return await getFirstLevelRef(referrer, level);
    } else if (referrer.thirdLevel.length < 27) {
      return await getSecondLevelRef(referrer, level);
    } else if (referrer.FourthLevel.length < 81) {
      return await getThirdLevelRef(referrer, level);
    } else if (referrer.FifthLevel.length < 243) {
      return await getFourthLevelRef(referrer, level);
    } else if (referrer.SixthLevel.length < 729) {
      return await getFifthLevelRef(referrer, level);
    }
    return await getSixthLevelRef(referrer, level);
  } catch (error) {
    console.log("file: user.ts:85  updateX12Referrer  error:", error);
  }
}
