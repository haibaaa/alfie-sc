import { sql } from "drizzle-orm";
import { 
  pgTableCreator,
  pgEnum,
} from "drizzle-orm/pg-core";

/**
 * Create tables with a custom prefix
 */
export const createTable = pgTableCreator((name) => `marketplace_${name}`);

// User account type enum
export const accountTypeEnum = pgEnum('account_type', ['client', 'freelancer', 'admin']);

// Users table
export const users = createTable(
  "users",
  (t) => ({
    userId: t.integer("user_id").primaryKey().generatedByDefaultAsIdentity(),
    password: t.varchar("password", { length: 255 }).notNull(),
    firstName: t.varchar("first_name", { length: 100 }).notNull(),
    lastName: t.varchar("last_name", { length: 100 }).notNull(),
    bio: t.text("bio"),
    joinDate: t.date("join_date").default(sql`CURRENT_DATE`).notNull(),
    profilePicture: t.varchar("profile_picture", { length: 255 }),
    email: t.varchar("email", { length: 255 }).notNull().unique(),
    accType: accountTypeEnum("acc_type").notNull(),
    rating: t.numeric("rating", { precision: 2, scale: 1 }),
    createdAt: t.timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: t.timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
  })
);

// Messages table
export const messages = createTable(
  "messages",
  (t) => ({
    messageId: t.integer("message_id").primaryKey().generatedByDefaultAsIdentity(),
    messageTime: t.timestamp("message_time", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    messageText: t.text("message_text").notNull(),
    senderId: t.integer("sender_id").references(() => users.userId).notNull(),
    receiverId: t.integer("receiver_id").references(() => users.userId).notNull(),
    createdAt: t.timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: t.timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
  })
);

// Gigs table
export const gigs = createTable(
  "gigs",
  (t) => ({
    gigId: t.integer("gig_id").primaryKey().generatedByDefaultAsIdentity(),
    status: t.boolean("status").default(true).notNull(),
    freelancerId: t.integer("freelancer_id").references(() => users.userId).notNull(),
    title: t.varchar("title", { length: 256 }).notNull(),
    description: t.text("description").notNull(),
    deliveryTime: t.integer("delivery_time").notNull(), // Store as hours or days
    category: t.varchar("category", { length: 100 }).notNull(),
    price: t.numeric("price", { precision: 10, scale: 2 }).notNull(), // Using numeric instead of money
    createdAt: t.timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: t.timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
  })
);

// Orders table
export const orders = createTable(
  "orders",
  (t) => ({
    orderId: t.integer("order_id").primaryKey().generatedByDefaultAsIdentity(),
    gigId: t.integer("gig_id").references(() => gigs.gigId).notNull(),
    clientId: t.integer("client_id").references(() => users.userId).notNull(),
    paymentStatus: t.boolean("payment_status").default(false).notNull(),
    transactionDate: t.date("transaction_date").default(sql`CURRENT_DATE`),
    amount: t.numeric("amount", { precision: 10, scale: 2 }).notNull(),
    createdAt: t.timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: t.timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
  })
);

// Payment table
export const payments = createTable(
  "payments",
  (t) => ({
    paymentId: t.integer("payment_id").primaryKey().generatedByDefaultAsIdentity(),
    orderId: t.integer("order_id").references(() => orders.orderId).notNull(),
    clientId: t.integer("client_id").references(() => users.userId).notNull(),
    freelancerId: t.integer("freelancer_id").references(() => users.userId).notNull(),
    createdAt: t.timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: t.timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
  })
);

// Reviews table
export const reviews = createTable(
  "reviews",
  (t) => ({
    reviewId: t.integer("review_id").primaryKey().generatedByDefaultAsIdentity(),
    reviewDate: t.date("review_date").default(sql`CURRENT_DATE`).notNull(),
    rating: t.numeric("rating", { precision: 2, scale: 1 }).notNull(),
    feedback: t.text("feedback").notNull(),
    receiverId: t.integer("receiver_id").references(() => users.userId).notNull(),
    reviewerId: t.integer("reviewer_id").references(() => users.userId).notNull(),
    createdAt: t.timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: t.timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
  })
);

// Disputes table
export const disputes = createTable(
  "disputes",
  (t) => ({
    disputeId: t.integer("dispute_id").primaryKey().generatedByDefaultAsIdentity(),
    orderId: t.integer("order_id").references(() => orders.orderId).notNull(),
    complainantId: t.integer("complainant_id").references(() => users.userId).notNull(),
    respondentId: t.integer("respondent_id").references(() => users.userId).notNull(),
    description: t.text("description").notNull(),
    createdAt: t.timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: t.timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
  })
);