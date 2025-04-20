'use server';

import { db } from '~/server/db';
import { disputes } from '~/server/db/schema';
import { revalidatePath } from 'next/cache';

// Define the expected shape of dispute data
interface DisputeData {
  orderId: number;
  complainantId: number;
  respondentId: number;
  description: string;
}

// Insert a new dispute into the `disputes` table
export async function createDispute(data: DisputeData) {
  try {
    await db.insert(disputes).values(data);
    revalidatePath('/dispute'); // Refresh the dispute page after submission
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error creating dispute:', err.message);
    } else {
      console.error('Unknown error creating dispute:', err);
    }
    throw new Error('Failed to create dispute');
  }
}
