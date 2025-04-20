export type Dispute = {
    disputeId: number;
    orderId: number;
    complainantId: number;
    respondentId: number;
    description: string;
    createdAt: string;
  };
  
  export const mockDisputes: Dispute[] = [
    {
      disputeId: 1,
      orderId: 101,
      complainantId: 1,
      respondentId: 2,
      description: "Freelancer did not deliver the expected quality.",
      createdAt: "2025-04-18T12:00:00Z",
    },
    {
      disputeId: 2,
      orderId: 102,
      complainantId: 3,
      respondentId: 4,
      description: "Client refused to pay after delivery.",
      createdAt: "2025-04-17T08:30:00Z",
    },
  ];
  