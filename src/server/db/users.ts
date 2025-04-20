'use server';

import { db } from './index'; // correct path to db instance
import { users } from './schema'; // correct path to schema
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

interface OnboardingData {
  firstName?: string;
  lastName?: string;
  bio?: string;
  profilePictureUrl?: string;
  email?: string;
  accType?: 'client' | 'freelancer' | 'admin';
}

export async function upsertUser(data: OnboardingData) {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) throw new Error('Unauthorized');

  try {
    console.log('Looking for user with userHash:', clerkUserId);
    const existingUser = await db.query.users.findFirst({
      where: eq(users.userHash, clerkUserId),
    });
    console.log('Existing user found:', existingUser ? 'Yes' : 'No');

    const userValues = {
      userHash: clerkUserId,
      firstName: data.firstName ?? '',
      lastName: data.lastName ?? '',
      bio: data.bio ?? 'Hello there!',
      profilePicture: data.profilePictureUrl ?? '',
      email: data.email ?? '',
      accType: data.accType ?? 'client',
      rating: String(5.0),
    };

    if (existingUser) {
      await db.update(users).set(userValues).where(eq(users.userHash, clerkUserId));
    } else {
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
