import { IMatrix, MATRIX } from "../models/matrix";

export async function getFirstLevelRef(referrer: IMatrix, level: number) {
  try {
    const firstLevelRef1: IMatrix | null = await MATRIX.findOne({
      address: referrer.firstLevel[0],
      level,
    });
    const firstLevelRef2: IMatrix | null = await MATRIX.findOne({
      address: referrer.firstLevel[1],
      level,
    });
    const firstLevelRef3: IMatrix | null = await MATRIX.findOne({
      address: referrer.firstLevel[2],
      level,
    });

    if (!firstLevelRef1 || !firstLevelRef2 || !firstLevelRef3)
      return console.log("first level ref not found");

    if (
      firstLevelRef1.firstLevel.length <= firstLevelRef2.firstLevel.length &&
      firstLevelRef2.firstLevel.length <= firstLevelRef3.firstLevel.length
    ) {
      return firstLevelRef1.address;
    } else if (
      firstLevelRef2.firstLevel.length <= firstLevelRef3.firstLevel.length
    ) {
      return firstLevelRef2.address;
    } else {
      return firstLevelRef3.address;
    }
  } catch (error) {
    console.log("file: user.ts:117  getFirstLevelRef  error:", error);
  }
}

export async function getSecondLevelRef(referrer: IMatrix, level: number) {
  try {
    const length = 8;
    let referrerAddress;
    const LevelRefs: any = [];

    for (let i = 0; i < length + 1; i++) {
      const secondLevelRef: IMatrix | null = await MATRIX.findOne({
        address: referrer.secondLevel[i],
        level,
      });

      if (!secondLevelRef) {
        return console.log("Second level ref not found");
      }

      LevelRefs.push(secondLevelRef);
    }

    for (let j = 0; j < length; j++) {
      let isRef = true;

      for (let i = j; i < length; i++) {
        if (
          LevelRefs[i].firstLevel.length > LevelRefs[i + 1].firstLevel.length
        ) {
          isRef = false;
          break; // Exit the loop
        }
      }

      if (isRef) {
        referrerAddress = LevelRefs[j].address;
        break;
      }

      if (j + 1 === length) {
        referrerAddress = LevelRefs[j + 1].address;
        break;
      }
    }

    return referrerAddress;
  } catch (error) {
    console.log("file: user.ts:161  getSecondLevelRef  error:", error);
  }
}

export async function getThirdLevelRef(referrer: IMatrix, level: number) {
  try {
    const length = 26;
    let referrerAddress;
    const LevelRefs: any = [];

    for (let i = 0; i < length + 1; i++) {
      const thirdLevelRef: IMatrix | null = await MATRIX.findOne({
        address: referrer.thirdLevel[i],
        level,
      });

      if (!thirdLevelRef) {
        return console.log("third level ref not found");
      }

      LevelRefs.push(thirdLevelRef);
    }

    for (let j = 0; j < length; j++) {
      let isRef = true;

      for (let i = j; i < length; i++) {
        if (
          LevelRefs[i].firstLevel.length > LevelRefs[i + 1].firstLevel.length
        ) {
          isRef = false;
          break; // Exit the loop
        }
      }

      if (isRef) {
        referrerAddress = LevelRefs[j].address;
        break;
      }

      if (j + 1 === length) {
        referrerAddress = LevelRefs[j + 1].address;
        break;
      }
    }

    return referrerAddress;
  } catch (error) {
    console.log("file: user.ts:205  getThirdLevelRef  error:", error);
  }
}

export async function getFourthLevelRef(referrer: IMatrix, level: number) {
  try {
    const length = 80;
    let referrerAddress;
    const LevelRefs: any = [];

    for (let i = 0; i < length + 1; i++) {
      const thirdLevelRef: IMatrix | null = await MATRIX.findOne({
        address: referrer.FourthLevel[i],
        level,
      });

      if (!thirdLevelRef) {
        return console.log("third level ref not found");
      }

      LevelRefs.push(thirdLevelRef);
    }

    for (let j = 0; j < length; j++) {
      let isRef = true;

      for (let i = j; i < length; i++) {
        if (
          LevelRefs[i].firstLevel.length > LevelRefs[i + 1].firstLevel.length
        ) {
          isRef = false;
          break; // Exit the loop
        }
      }

      if (isRef) {
        referrerAddress = LevelRefs[j].address;
        break;
      }

      if (j + 1 === length) {
        referrerAddress = LevelRefs[j + 1].address;
        break;
      }
    }

    return referrerAddress;
  } catch (error) {
    console.log("file: user.ts:249  getFourthLevelRef  error:", error);
  }
}

export async function getFifthLevelRef(referrer: IMatrix, level: number) {
  try {
    const length = 242;
    let referrerAddress;
    const LevelRefs: any = [];

    for (let i = 0; i < length + 1; i++) {
      const thirdLevelRef: IMatrix | null = await MATRIX.findOne({
        address: referrer.FifthLevel[i],
        level,
      });

      if (!thirdLevelRef) {
        return console.log("third level ref not found");
      }

      LevelRefs.push(thirdLevelRef);
    }

    for (let j = 0; j < length; j++) {
      let isRef = true;

      for (let i = j; i < length; i++) {
        if (
          LevelRefs[i].firstLevel.length > LevelRefs[i + 1].firstLevel.length
        ) {
          isRef = false;
          break; // Exit the loop
        }
      }

      if (isRef) {
        referrerAddress = LevelRefs[j].address;
        break;
      }

      if (j + 1 === length) {
        referrerAddress = LevelRefs[j + 1].address;
        break;
      }
    }

    return referrerAddress;
  } catch (error) {
    console.log("file: user.ts:293  getFifthLevelRef  error:", error);
  }
}

export async function getSixthLevelRef(refMatrix: IMatrix, level: number) {
  try {
    const length = 728;
    let referrerAddress;
    const LevelRefsMatrixes: any = [];

    for (let i = 0; i < length + 1; i++) {
      const levelRefMatrix: IMatrix | null = await MATRIX.findOne({
        address: refMatrix.SixthLevel[i],
        level,
      });

      if (!levelRefMatrix) {
        return console.log("level ref not found");
      }

      LevelRefsMatrixes.push(levelRefMatrix);
    }

    for (let j = 0; j < length; j++) {
      let isRef = true;

      for (let i = j; i < length; i++) {
        if (
          LevelRefsMatrixes[i].firstLevel.length >
          LevelRefsMatrixes[i + 1].firstLevel.length
        ) {
          isRef = false;
          break; // Exit the loop
        }
      }

      if (isRef) {
        referrerAddress = LevelRefsMatrixes[j].address;
        break;
      }

      if (j + 1 === length) {
        referrerAddress = LevelRefsMatrixes[j + 1].address;
        break;
      }
    }

    return referrerAddress;
  } catch (error) {
    console.log("file: user.ts:337  getSixthLevelRef  error:", error);
  }
}
