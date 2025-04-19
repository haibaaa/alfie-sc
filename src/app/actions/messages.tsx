'use server';

import { db } from '~/server/db';
import { messages } from '~/server/db/schema';
import { revalidatePath } from 'next/cache';

// Strict type based on schema
interface CreateMessageData {
  messageText: string;
  senderId: number;
  receiverId: number;
  messageTime?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Create a new message
export async function createMessage(data: CreateMessageData) {
  try {
    await db.insert(messages).values({
      messageText: data.messageText,
      senderId: data.senderId,
      receiverId: data.receiverId,
      messageTime: data.messageTime ?? new Date(),
      createdAt: data.createdAt ?? new Date(),
      updatedAt: data.updatedAt ?? new Date(),
    });

    revalidatePath('/');
  } catch (err) {
    const e = err as Error;
    console.error('Error creating message:', e.message);
    throw new Error('Message creation failed');
  }
}
