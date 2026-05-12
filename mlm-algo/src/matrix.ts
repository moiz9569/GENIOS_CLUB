class ReferralMatrix {
  public matrix: string[][];

  constructor(levels: number) {
    this.matrix = this.createMatrix(levels);
  }

  private createMatrix(levels: number): string[][] {
    const matrix: string[][] = [];

    for (let i = 0; i <= levels; i++) {
      const maxReferrals = Math.pow(3, i);
      matrix[i] = new Array(maxReferrals);
    }

    return matrix;
  }

  public addReferral(level: number, position: number, referral: string): void {
    if (level >= 0 && level < this.matrix.length) {
      this.matrix[level][position] = referral;
    }
  }

  public getReferral(level: number, position: number): string | null {
    if (level >= 0 && level < this.matrix.length) {
      return this.matrix[level][position];
    }
    return null;
  }
}

// Create an instance of the ReferralMatrix with 7 levels
const referralMatrix = new ReferralMatrix(7);

// Add referrals at different levels and positions
referralMatrix.addReferral(0, 0, "A");
referralMatrix.addReferral(1, 0, "B");
referralMatrix.addReferral(1, 1, "C");
referralMatrix.addReferral(1, 2, "D");
referralMatrix.addReferral(2, 0, "E");
referralMatrix.addReferral(2, 1, "F");
referralMatrix.addReferral(2, 2, "G");
// Add more referrals...

console.log(referralMatrix.matrix);

// // Retrieve referrals at different levels and positions
// const referralA = referralMatrix.getReferral(0, 0);
// console.log("Referral at level 0, position 0:", referralA);

// const referralB = referralMatrix.getReferral(1, 0);
// console.log("Referral at level 1, position 0:", referralB);

// const referralE = referralMatrix.getReferral(2, 0);
// console.log("Referral at level 2, position 0:", referralE);
