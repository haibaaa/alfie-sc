// actions/review.ts
import { db } from '~/server/db';
import { reviews } from '~/server/db/schema'  // Assuming you have a 'reviews' schema in Drizzle

// Function to save a review
export const saveReview = async (reviewData: {
    rating: number;  // Keep rating as number
    feedback: string;
    reviewerId: number;
    receiverId: number;
  }) => {
    try {
      const { rating, feedback, reviewerId, receiverId } = reviewData;
  
      // Insert review data into the database
      const review = await db.insert(reviews).values({
        rating: rating.toString(), // Cast rating to string
        feedback,
        reviewerId, // The user ID of the reviewer
        receiverId, // The user ID of the receiver
      });
  
      return review; // Return the inserted review or a success message
    } catch (error) {
      console.error('Error saving review:', error);
      throw new Error('Failed to save review');
    }
  };
