interface User {
  id: number;
  referrer: string;
  partnersCount: number;
  currentReferrer: string;
  firstLevel: string[];
  secondLevel: string[];
  reinvestCount: number;
}

class GeniosClub {
  private users: Record<string, User>;
  private lastUserId: number;
  private id1: string;

  constructor() {
    this.users = {};
    this.lastUserId = 2;
    this.id1 = "A";

    this.users[this.id1] = {
      id: 1,
      referrer: "0",
      partnersCount: 0,
      currentReferrer: "",
      firstLevel: [],
      secondLevel: [],
      reinvestCount: 0,
    };
  }

  public registration(userAddress: string, referrerAddress: string): void {
    if (this.isUserExists(userAddress)) {
      throw new Error("User exists");
    }
    if (!this.isUserExists(referrerAddress)) {
      throw new Error("Referrer does not exist");
    }

    this.users[userAddress] = {
      id: this.lastUserId,
      referrer: referrerAddress,
      partnersCount: 0,
      currentReferrer: "",
      firstLevel: [],
      secondLevel: [],
      reinvestCount: 0,
    };

    this.lastUserId++;
    this.users[referrerAddress].partnersCount++;

    this.updateReferrerLevels(userAddress, referrerAddress);
  }

  private updateReferrerLevels(userAddress: string, referrerAddress: string): void {
    const referrer = this.users[referrerAddress];

    if (referrer.firstLevel.length < 3) {
      referrer.firstLevel.push(userAddress);

      this.users[userAddress].currentReferrer = referrerAddress;

      if (referrerAddress === this.id1) return;

      const ref = this.users[referrerAddress].currentReferrer;
      this.users[ref].secondLevel.push(userAddress);

      return this.resetReferrerLevel(ref);
    }

    referrer.secondLevel.push(userAddress);

    const firstLevelRef1 = this.users[referrer.firstLevel[0]];
    const firstLevelRef2 = this.users[referrer.firstLevel[1]];
    const firstLevelRef3 = this.users[referrer.firstLevel[2]];

    if (
      firstLevelRef1.firstLevel.length <= firstLevelRef2.firstLevel.length &&
      firstLevelRef2.firstLevel.length <= firstLevelRef3.firstLevel.length
    ) {
      this.updateFirstLevel(userAddress, referrerAddress, 0);
    } else if (firstLevelRef2.firstLevel.length <= firstLevelRef3.firstLevel.length) {
      this.updateFirstLevel(userAddress, referrerAddress, 1);
    } else {
      this.updateFirstLevel(userAddress, referrerAddress, 2);
    }

    this.resetReferrerLevel(referrerAddress);
  }

  private updateFirstLevel(userAddress: string, referrerAddress: string, x2: number): void {
    const referrer = this.users[referrerAddress];

    if (x2 === 0) {
      this.users[referrer.firstLevel[0]].firstLevel.push(userAddress);
      this.users[userAddress].currentReferrer = referrer.firstLevel[0];
    } else if (x2 === 1) {
      this.users[referrer.firstLevel[1]].firstLevel.push(userAddress);
      this.users[userAddress].currentReferrer = referrer.firstLevel[1];
    } else {
      this.users[referrer.firstLevel[2]].firstLevel.push(userAddress);
      this.users[userAddress].currentReferrer = referrer.firstLevel[2];
    }
  }

  private resetReferrerLevel(referrerAddress: string): void {
    const referrer = this.users[referrerAddress];

    if (referrer.secondLevel.length < 9) return;

    referrer.firstLevel = [];
    referrer.secondLevel = [];

    referrer.reinvestCount++;

    if (referrerAddress !== this.id1) {
      this.updateReferrerLevels(referrerAddress, referrerAddress);
    }
  }

  public usersMatrix(userAddress: string): [string, string[], string[]] {
    const user = this.users[userAddress];
    return [user.currentReferrer, user.firstLevel, user.secondLevel];
  }

  private isUserExists(user: string): boolean {
    return this.users[user] !== undefined;
  }
}

const geniosClub = new GeniosClub();

geniosClub.registration("b", "A");
geniosClub.registration("c", "A");
geniosClub.registration("d", "A");
geniosClub.registration("e", "A");
geniosClub.registration("f", "A");
geniosClub.registration("g", "A");

console.log(geniosClub.usersMatrix("A"));
