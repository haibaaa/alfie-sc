export type Review = {
    reviewId: number;
    reviewDate: string;
    rating: number;
    feedback: string;
    reviewerName: string;
    receiverName: string;
  };
  
  export const mockReviews: Review[] = [
    {
      reviewId: 1,
      reviewDate: "2025-04-15",
      rating: 4.5,
      feedback: "Great communication and work quality!",
      reviewerName: "Alice",
      receiverName: "Bob",
    },
    {
      reviewId: 2,
      reviewDate: "2025-04-10",
      rating: 3.0,
      feedback: "Met expectations, but could improve speed.",
      reviewerName: "Charlie",
      receiverName: "Bob",
    },
  ];
  