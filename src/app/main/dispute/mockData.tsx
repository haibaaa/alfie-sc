// mockData.ts
export type Dispute = {
  disputeId: number;
  orderId: number;
  createdAt: Date; // Keep this as Date type
  updatedAt: Date | null;
  description: string;
  complainantId: number;
  respondentId: number;
};

export const mockDisputes: Dispute[] = [
  {
    disputeId: 1,
    orderId: 101,
    complainantId: 1,
    respondentId: 2,
    description: "Freelancer did not deliver the expected quality.",
    createdAt: new Date("2025-04-18T12:00:00Z"), // Keep as Date object
    updatedAt: null,
  },
  {
    disputeId: 2,
    orderId: 102,
    complainantId: 3,
    respondentId: 4,
    description: "Client claims the work was not completed on time.", // Description added here
    createdAt: new Date("2025-04-17T08:30:00Z"), // Keep as Date object
    updatedAt: null,
  },
];
