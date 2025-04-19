'use server';

import { db } from '~/server/db';
import { users } from '~/server/db/schema';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

// Define the expected shape of data
interface OnboardingData {
  firstName?: string;
  lastName?: string;
  bio?: string;
  profilePictureUrl?: string;
  email?: string;
  accType?: 'client' | 'freelancer' | 'admin';
}

// Insert or update user in custom `users` table
export async function upsertUser(data: OnboardingData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.userId, userId),
    });

    const userValues = {
      userId,
      firstName: data.firstName ?? '',
      lastName: data.lastName ?? '',
      bio: data.bio ?? 'Hello there!',
      profilePicture: data.profilePictureUrl ?? '',
      email: data.email ?? '',
      accType: data.accType ?? 'client',
      rating: String(5.0),
    };

    if (existingUser) {
      // Update existing record
      await db
        .update(users)
        .set(userValues)
        .where(eq(users.userId, userId));
    } else {
      // Create new record
      await db.insert(users).values(userValues);
    }

    revalidatePath('/');
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error upserting user:', err.message);
    } else {
      console.error('Unknown error upserting user:', err);
    }
    throw new Error('Failed to upsert user');
  }
}