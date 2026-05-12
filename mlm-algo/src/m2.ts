class User {
  public id: number = 0;
  public referrer: string = "";
  public partnersCount: number = 0;
  public currentReferrer: string = "";
  public reinvestCount: number = 0;
  public firstLevel: string[] = [];
  public secondLevel: string[] = [];
  public thirdLevel: string[] = [];
}

class M2 {
  public users: Record<string, User> = {};
  public lastUserId: number = 2;
  public id0: string = "root";

  constructor() {
    this.users[this.id0] = new User();
    this.users[this.id0].id = 1;
  }

  private _registration(userAddress: string, referrerAddress: string): void {
    if (this.isUserExists(userAddress)) {
      throw new Error("User exists");
    }

    if (!this.isUserExists(referrerAddress)) {
      throw new Error("Referrer does not exist");
    }

    const user = this.users[userAddress];

    user.id = this.lastUserId;
    user.referrer = referrerAddress;
    user.partnersCount = 0;

    this.lastUserId++;
    this.users[referrerAddress].partnersCount++;

    this._updateX12Referrer(userAddress, referrerAddress);
  }

  private _updateX12Referrer(userAddress: string, referrerAddress: string): void {
    const referrer = this.users[referrerAddress];

    if (this.getFirstLevelLength(referrerAddress) < 3) {
      referrer.firstLevel.push(userAddress);
      this.users[userAddress].currentReferrer = referrerAddress;

      if (referrerAddress === this.id0) return;

      const currentReferrer = referrer.currentReferrer;
      this.users[currentReferrer].secondLevel.push(userAddress);

      this._updateX12ReferrerSecondLevel(currentReferrer);
      return;
    }

    if (this.getSecondLevelLength(referrerAddress) < 9) {
      referrer.secondLevel.push(userAddress);

      const firstLevelRef1 = this.users[referrer.firstLevel[0]];
      const firstLevelRef2 = this.users[referrer.firstLevel[1]];
      const firstLevelRef3 = this.users[referrer.firstLevel[2]];

      if (
        firstLevelRef1.firstLevel.length <= firstLevelRef2.firstLevel.length &&
        firstLevelRef2.firstLevel.length <= firstLevelRef3.firstLevel.length
      ) {
        this._updateFirstLevel(userAddress, referrerAddress, 0);
      } else if (firstLevelRef2.firstLevel.length <= firstLevelRef3.firstLevel.length) {
        this._updateFirstLevel(userAddress, referrerAddress, 1);
      } else {
        this._updateFirstLevel(userAddress, referrerAddress, 2);
      }

      return;
    }

    referrer.thirdLevel.push(userAddress);

    const secondLevelRef1 = this.users[referrer.secondLevel[0]];
    const secondLevelRef2 = this.users[referrer.secondLevel[1]];
    const secondLevelRef3 = this.users[referrer.secondLevel[2]];
    const secondLevelRef4 = this.users[referrer.secondLevel[3]];
    const secondLevelRef5 = this.users[referrer.secondLevel[4]];
    const secondLevelRef6 = this.users[referrer.secondLevel[5]];
    const secondLevelRef7 = this.users[referrer.secondLevel[6]];
    const secondLevelRef8 = this.users[referrer.secondLevel[7]];
    const secondLevelRef9 = this.users[referrer.secondLevel[8]];

    if (
      secondLevelRef1.firstLevel.length <= secondLevelRef2.firstLevel.length &&
      secondLevelRef2.firstLevel.length <= secondLevelRef3.firstLevel.length &&
      secondLevelRef3.firstLevel.length <= secondLevelRef4.firstLevel.length &&
      secondLevelRef4.firstLevel.length <= secondLevelRef5.firstLevel.length &&
      secondLevelRef5.firstLevel.length <= secondLevelRef6.firstLevel.length &&
      secondLevelRef6.firstLevel.length <= secondLevelRef7.firstLevel.length &&
      secondLevelRef7.firstLevel.length <= secondLevelRef8.firstLevel.length &&
      secondLevelRef8.firstLevel.length <= secondLevelRef9.firstLevel.length
    ) {
      this._updateFirstLevelForSecond(userAddress, referrerAddress, 0);
    } else if (
      secondLevelRef2.firstLevel.length <= secondLevelRef3.firstLevel.length &&
      secondLevelRef3.firstLevel.length <= secondLevelRef4.firstLevel.length &&
      secondLevelRef4.firstLevel.length <= secondLevelRef5.firstLevel.length &&
      secondLevelRef5.firstLevel.length <= secondLevelRef6.firstLevel.length &&
      secondLevelRef6.firstLevel.length <= secondLevelRef7.firstLevel.length &&
      secondLevelRef7.firstLevel.length <= secondLevelRef8.firstLevel.length &&
      secondLevelRef8.firstLevel.length <= secondLevelRef9.firstLevel.length
    ) {
      this._updateFirstLevelForSecond(userAddress, referrerAddress, 1);
    } else if (
      secondLevelRef3.firstLevel.length <= secondLevelRef4.firstLevel.length &&
      secondLevelRef4.firstLevel.length <= secondLevelRef5.firstLevel.length &&
      secondLevelRef5.firstLevel.length <= secondLevelRef6.firstLevel.length &&
      secondLevelRef6.firstLevel.length <= secondLevelRef7.firstLevel.length &&
      secondLevelRef7.firstLevel.length <= secondLevelRef8.firstLevel.length &&
      secondLevelRef8.firstLevel.length <= secondLevelRef9.firstLevel.length
    ) {
      this._updateFirstLevelForSecond(userAddress, referrerAddress, 2);
    } else if (
      secondLevelRef4.firstLevel.length <= secondLevelRef5.firstLevel.length &&
      secondLevelRef5.firstLevel.length <= secondLevelRef6.firstLevel.length &&
      secondLevelRef6.firstLevel.length <= secondLevelRef7.firstLevel.length &&
      secondLevelRef7.firstLevel.length <= secondLevelRef8.firstLevel.length &&
      secondLevelRef8.firstLevel.length <= secondLevelRef9.firstLevel.length
    ) {
      this._updateFirstLevelForSecond(userAddress, referrerAddress, 3);
    } else if (
      secondLevelRef5.firstLevel.length <= secondLevelRef6.firstLevel.length &&
      secondLevelRef6.firstLevel.length <= secondLevelRef7.firstLevel.length &&
      secondLevelRef7.firstLevel.length <= secondLevelRef8.firstLevel.length &&
      secondLevelRef8.firstLevel.length <= secondLevelRef9.firstLevel.length
    ) {
      this._updateFirstLevelForSecond(userAddress, referrerAddress, 4);
    } else if (
      secondLevelRef6.firstLevel.length <= secondLevelRef7.firstLevel.length &&
      secondLevelRef7.firstLevel.length <= secondLevelRef8.firstLevel.length &&
      secondLevelRef8.firstLevel.length <= secondLevelRef9.firstLevel.length
    ) {
      this._updateFirstLevelForSecond(userAddress, referrerAddress, 5);
    } else if (
      secondLevelRef7.firstLevel.length <= secondLevelRef8.firstLevel.length &&
      secondLevelRef8.firstLevel.length <= secondLevelRef9.firstLevel.length
    ) {
      this._updateFirstLevelForSecond(userAddress, referrerAddress, 6);
    } else if (secondLevelRef8.firstLevel.length <= secondLevelRef9.firstLevel.length) {
      this._updateFirstLevelForSecond(userAddress, referrerAddress, 7);
    } else {
      this._updateFirstLevelForSecond(userAddress, referrerAddress, 8);
    }
  }

  private _updateFirstLevel(userAddress: string, referrerAddress: string, x2: number): void {
    const x2Address = this.users[referrerAddress].firstLevel[x2];
    this.users[x2Address].firstLevel.push(userAddress);
    this.users[userAddress].currentReferrer = x2Address;

    this._updateX12ReferrerSecondLevel(x2Address);
  }

  private _updateFirstLevelForSecond(userAddress: string, referrerAddress: string, x2: number): void {
    const x2Address = this.users[referrerAddress].secondLevel[x2];
    this.users[x2Address].firstLevel.push(userAddress);
    this.users[userAddress].currentReferrer = x2Address;

    console.log(">>>>>>>>>>>>>", x2Address);

    this._updateX12ReferrerSecondLevel(x2Address);
  }

  private _updateX12ReferrerSecondLevel(referrerAddress: string): void {
    const referrer = this.users[referrerAddress];
    if (referrer.thirdLevel.length < 27) {
      return;
    }

    referrer.firstLevel = [];
    referrer.secondLevel = [];
    referrer.thirdLevel = [];

    referrer.reinvestCount++;
    if (referrerAddress !== this.id0) {
      this._updateX12Referrer(referrerAddress, referrerAddress);
    }
  }

  public getFirstLevelLength(addr: string): number {
    return this.users[addr].firstLevel.length;
  }

  public getSecondLevelLength(addr: string): number {
    return this.users[addr].secondLevel.length;
  }

  public registrationExt(userAddress: string, referrerAddress: string): void {
    if (this.users[userAddress] === undefined) {
      this.users[userAddress] = new User();
    }
    this._registration(userAddress, referrerAddress);
  }

  public usersX12Matrix(userAddress: string): [string, string[], string[], string[]] {
    const user = this.users[userAddress];
    return [user.currentReferrer, user.firstLevel, user.secondLevel, user.thirdLevel];
  }

  public isUserExists(user: string): boolean {
    if (!(user in this.users)) {
      return false;
    }

    return this.users[user].id !== 0;
  }
}

// Example usage and tests
const contract = new M2();

// Perform registrations
contract.registrationExt("u0", "root");

contract.registrationExt("u1", "u0");
contract.registrationExt("u2", "u0");
contract.registrationExt("u3", "u0");

contract.registrationExt("u4", "u0");
contract.registrationExt("u5", "u0");
contract.registrationExt("u6", "u0");

contract.registrationExt("u7", "u0");
contract.registrationExt("u8", "u0");
contract.registrationExt("u9", "u0");

contract.registrationExt("u10", "u0");
contract.registrationExt("u11", "u0");
contract.registrationExt("u12", "u0");

contract.registrationExt("u13", "u0");
contract.registrationExt("u14", "u0");
contract.registrationExt("u15", "u0");

contract.registrationExt("u16", "u13");

// Get matrix for a user
const [currentReferrer, firstLevel, secondLevel, thirdLevel] = contract.usersX12Matrix("u0");
console.log("User: u0 ---------------------------------------------");
console.log("Current Referrer:", currentReferrer);
console.log("First Level:", firstLevel);
console.log("Second Level:", secondLevel);
console.log("Third Level:", thirdLevel);
console.log("");

const [u1CurrentReferrer, u1FirstLevel, u1SecondLevel, u1ThirdLevel] = contract.usersX12Matrix("u1");
console.log("User: u1 ---------------------------------------------");
console.log("Current Referrer:", u1CurrentReferrer);
console.log("First Level:", u1FirstLevel);
console.log("Second Level:", u1SecondLevel);
console.log("Third Level:", u1ThirdLevel);
console.log("");

const [u2CurrentReferrer, u2FirstLevel, u2SecondLevel, u2ThirdLevel] = contract.usersX12Matrix("u2");
console.log("User: u2 ---------------------------------------------");
console.log("Current Referrer:", u2CurrentReferrer);
console.log("First Level:", u2FirstLevel);
console.log("Second Level:", u2SecondLevel);
console.log("Third Level:", u2ThirdLevel);
console.log("");

const [u3CurrentReferrer, u3FirstLevel, u3SecondLevel, u3ThirdLevel] = contract.usersX12Matrix("u3");
console.log("User: u3 ---------------------------------------------");
console.log("Current Referrer:", u3CurrentReferrer);
console.log("First Level:", u3FirstLevel);
console.log("Second Level:", u3SecondLevel);
console.log("Third Level:", u3ThirdLevel);
console.log("");

const [u4CurrentReferrer, u4FirstLevel, u4SecondLevel, u4ThirdLevel] = contract.usersX12Matrix("u4");
console.log("User: u4 ---------------------------------------------");
console.log("Current Referrer:", u4CurrentReferrer);
console.log("First Level:", u4FirstLevel);
console.log("Second Level:", u4SecondLevel);
console.log("Third Level:", u4ThirdLevel);
console.log("");

// Check user existence
// console.log("User exists:", contract.isUserExists("u0")); // true
// console.log("User exists:", contract.isUserExists("unknownUser")); // false
