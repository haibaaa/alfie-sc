'use server';

import { db } from '~/server/db';
import { gigs } from '~/server/db/schema';
import { users } from '~/server/db/schema'; 
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

// Strict type based on schema
type GigInsert = typeof gigs.$inferInsert;
type GigUpdate = Partial<Omit<GigInsert, 'gigId'>>;

// 1. CREATE GIG
export async function createGig(data: GigInsert) {
  try {
    await db.insert(gigs).values({
      ...data,
      status: data.status ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    } satisfies GigInsert);

    revalidatePath('/');
  } catch (err) {
    console.error('Error creating gig:', (err as Error).message);
    throw new Error('Gig creation failed');
  }
}

// 2. UPDATE GIG
export async function updateGig(gigId: number, updates: GigUpdate) {
  try {
    await db
      .update(gigs)
      .set({ ...updates, updatedAt: new Date() } satisfies GigUpdate)
      .where(eq(gigs.gigId, gigId));

    revalidatePath('/');
  } catch (err) {
    console.error('Error updating gig:', (err as Error).message);
    throw new Error('Gig update failed');
  }
}

// 3. DELETE GIG
export async function deleteGig(gigId: number) {
  try {
    await db.delete(gigs).where(eq(gigs.gigId, gigId));
    revalidatePath('/');
  } catch (err) {
    console.error('Error deleting gig:', (err as Error).message);
    throw new Error('Gig deletion failed');
  }
}

export async function getGigsWithFreelancer() {
  try {
    const results = await db
      .select({
        gigId: gigs.gigId,
        title: gigs.title,
        description: gigs.description,
        price: gigs.price,
        category: gigs.category,
        deliveryTime: gigs.deliveryTime,
        freelancer: {
          id: users.userId,
          name: users.firstName,
          // Add avatar, username etc. if needed
        },
      })
      .from(gigs)
      .innerJoin(users, eq(gigs.freelancerId, users.userId));

    return results;
  } catch (err) {
    console.error('Error fetching gigs:', (err as Error).message);
    throw new Error('Failed to fetch gigs');
  }
}