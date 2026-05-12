class MLMTree {
  private root: Participant;
  private referrals: Map<string, Participant[]>;

  constructor(rootId: string) {
    this.root = new Participant(rootId);
    this.referrals = new Map();
  }

  public addParticipant(participantId: string, sponsorId: string): void {
    const participant: Participant = new Participant(participantId);

    const sponsor: Participant | undefined = this.findParticipant(sponsorId);

    if (!sponsor) {
      throw new Error("Sponsor participant does not exist.");
    }

    if (!this.referrals.has(sponsorId)) {
      this.referrals.set(sponsorId, []);
    }

    const sponsorReferrals: Participant[] | undefined = this.referrals.get(sponsorId);

    if (sponsorReferrals === undefined) {
      throw new Error("Sponsor does not have any referrals.");
    }

    if (sponsorReferrals.length >= 3) {
      throw new Error("Sponsor already has three referrals.");
    }

    sponsorReferrals.push(participant);
  }

  public findParticipant(participantId: string, node: Participant = this.root): Participant | undefined {
    if (node.id === participantId) {
      return node;
    }

    let foundParticipant: Participant | undefined = undefined;
    for (const referral of node.referrals) {
      foundParticipant = this.findParticipant(participantId, referral);
      if (foundParticipant) {
        break;
      }
    }

    return foundParticipant;
  }

  public getReferralPath(participantId: string): string[] {
    const participant: Participant | undefined = this.findParticipant(participantId);
    console.log("participant: ", participant);
    if (!participant) {
      throw new Error("Participant does not exist.");
    }

    const referralPath: string[] = [];

    let currentParticipant: Participant | undefined = participant;
    while (currentParticipant !== undefined && currentParticipant !== this.root) {
      const sponsorId: string | undefined = this.findSponsorId(currentParticipant);
      if (sponsorId) {
        referralPath.unshift(sponsorId);
        currentParticipant = this.findParticipant(sponsorId);
      }
    }

    return referralPath;
  }

  private findSponsorId(participant: Participant): string | undefined {
    for (const [sponsorId, referrals] of this.referrals.entries()) {
      if (referrals.includes(participant)) {
        return sponsorId;
      }
    }
    return undefined;
  }
}

class Participant {
  public id: string;
  public referrals: Participant[];

  constructor(id: string) {
    this.id = id;
    this.referrals = [];
  }
}

// Usage:

const mlmTree: MLMTree = new MLMTree("A"); // Set root participant "A" in the constructor

// Add participants and referrals
mlmTree.addParticipant("B", "A");
// mlmTree.addParticipant("C", "A");
// mlmTree.addParticipant("D", "A");
// mlmTree.addParticipant("X", "A");
// mlmTree.addParticipant("E", "B");
// mlmTree.addParticipant("F", "B");
// mlmTree.addParticipant("G", "B");
// mlmTree.addParticipant("H", "C");
// mlmTree.addParticipant("I", "C");
// mlmTree.addParticipant("J", "C");

// Get referral paths
// const referralPathB: string[] = mlmTree.getReferralPath("B");
// console.log("Referral path of B:", referralPathB);
// // Output: ['A']

const referralPathE: string[] = mlmTree.getReferralPath("E");
console.log("Referral path of E:", referralPathE);
// Output: [ 'B', 'A' ]

// const referralPathH: string[] = mlmTree.getReferralPath("H");
// console.log("Referral path of H:", referralPathH);
// // Output: [ 'C', 'A' ]
