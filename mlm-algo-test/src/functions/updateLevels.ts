import { IMatrix, MATRIX } from "../models/matrix";

const root = "root";

export async function updateAllSeventhLevels(
  userMatrix: IMatrix,
  curRefAdd: string,
  level: number
) {
  try {
    const refMatrix: any = await MATRIX.findOne({
      address: curRefAdd,
      level,
    });

    refMatrix.firstLevel.push(userMatrix.address);
    await refMatrix.save();

    userMatrix.currentReferrer = refMatrix.address;
    await userMatrix.save();

    if (refMatrix.currentReferrer === root) {
      return;
    }

    let curRefMatrix: any = await MATRIX.findOne({
      address: refMatrix.currentReferrer,
      level,
    });
    curRefMatrix.secondLevel.push(userMatrix.address);
    await curRefMatrix.save();

    if (curRefMatrix.currentReferrer === root) {
      return;
    }

    curRefMatrix = await MATRIX.findOne({
      address: curRefMatrix.currentReferrer,
      level,
    });
    curRefMatrix.thirdLevel.push(userMatrix.address);
    await curRefMatrix.save();

    if (curRefMatrix.currentReferrer === root) {
      return;
    }

    curRefMatrix = await MATRIX.findOne({
      address: curRefMatrix.currentReferrer,
      level,
    });
    curRefMatrix.FourthLevel.push(userMatrix.address);
    await curRefMatrix.save();

    if (curRefMatrix.currentReferrer === root) {
      return;
    }

    curRefMatrix = await MATRIX.findOne({
      address: curRefMatrix.currentReferrer,
      level,
    });
    curRefMatrix.FifthLevel.push(userMatrix.address);
    await curRefMatrix.save();

    if (curRefMatrix.currentReferrer === root) {
      return;
    }

    curRefMatrix = await MATRIX.findOne({
      address: curRefMatrix.currentReferrer,
      level,
    });
    curRefMatrix.SixthLevel.push(userMatrix.address);
    await curRefMatrix.save();

    if (curRefMatrix.currentReferrer === root) {
      return;
    }

    curRefMatrix = await MATRIX.findOne({
      address: curRefMatrix.currentReferrer,
      level,
    });
    curRefMatrix.SeventhLevel.push(userMatrix.address);
    await curRefMatrix.save();

    resetMatrix(refMatrix, level);
  } catch (error) {
    console.log(
      "file: userMatrix.ts:421  updatesecondToSeventhLevel  error:",
      error
    );
  }
}

export async function resetMatrix(referrer: IMatrix, level: number) {
  if (referrer.SeventhLevel.length < 2187) return;

  referrer.firstLevel = [];
  referrer.secondLevel = [];
  referrer.thirdLevel = [];
  referrer.FourthLevel = [];
  referrer.FifthLevel = [];
  referrer.SixthLevel = [];
  referrer.SeventhLevel = [];

  const nextMetrix: any = await MATRIX.findOne({
    address: referrer.address,
    level: level + 1,
  });
  if (!nextMetrix.blocked && level < 8 && referrer.address != root) {
    referrer.blocked = true;
  }

  referrer.reinvestCount++;
  await referrer.save();

  return referrer.address;
}
