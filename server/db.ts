import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, emailSignups, InsertEmailSignup, contactSubmissions, InsertContactSubmission } from "../drizzle/schema.ts";
import process from "node:process";

export type DrizzleDb = ReturnType<typeof drizzle>;

let _db: DrizzleDb | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb(): Promise<DrizzleDb | null> {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

/**
 * Ensures database connection is available, throws if not
 */
async function ensureDb(): Promise<DrizzleDb> {
  const db = await getDb();
  if (!db) {
    throw new Error("[Database] Database not available");
  }
  return db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const { ENV } = await import('./_core/env.ts');

    const values: InsertUser = {
      openId: user.openId,
      name: user.name,
      email: user.email,
      loginMethod: user.loginMethod,
      lastSignedIn: user.lastSignedIn ?? new Date(),
      role: user.role ?? (user.openId === ENV.ownerOpenId ? 'admin' : undefined),
    };

    const updateSet: Record<string, unknown> = {
      name: user.name,
      email: user.email,
      loginMethod: user.loginMethod,
      lastSignedIn: user.lastSignedIn ?? new Date(),
    };

    if (user.role !== undefined) {
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      updateSet.role = 'admin';
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * Email Signup Queries
 */
export async function addEmailSignup(email: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot add email signup: database not available");
    return;
  }

  try {
    await db.insert(emailSignups).values({
      email,
      status: "active",
    }).onDuplicateKeyUpdate({
      set: {
        status: "active",
        unsubscribedAt: null,
      },
    });
  } catch (error) {
    console.error("[Database] Failed to add email signup:", error);
    throw error;
  }
}

const VALID_EMAIL_STATUSES = ["active", "unsubscribed"] as const;
type EmailStatus = (typeof VALID_EMAIL_STATUSES)[number];

export async function getEmailSignups(status?: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get email signups: database not available");
    return [];
  }

  try {
    if (status) {
      if (!VALID_EMAIL_STATUSES.includes(status as EmailStatus)) {
        throw new Error(`Invalid email status: ${status}`);
      }
      return await db.select().from(emailSignups).where(eq(emailSignups.status, status as EmailStatus));
    }
    return await db.select().from(emailSignups);
  } catch (error) {
    console.error("[Database] Failed to get email signups:", error);
    throw error;
  }
}

/**
 * Contact Submission Queries
 */
export async function addContactSubmission(data: InsertContactSubmission): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot add contact submission: database not available");
    return;
  }

  try {
    await db.insert(contactSubmissions).values({
      name: data.name,
      email: data.email,
      company: data.company,
      message: data.message,
      status: "new",
    });
  } catch (error) {
    console.error("[Database] Failed to add contact submission:", error);
    throw error;
  }
}

const VALID_CONTACT_STATUSES = ["new", "read", "responded"] as const;
type ContactStatus = (typeof VALID_CONTACT_STATUSES)[number];

export async function getContactSubmissions(status?: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get contact submissions: database not available");
    return [];
  }

  try {
    if (status) {
      if (!VALID_CONTACT_STATUSES.includes(status as ContactStatus)) {
        throw new Error(`Invalid contact status: ${status}`);
      }
      return await db.select().from(contactSubmissions).where(eq(contactSubmissions.status, status as ContactStatus));
    }
    return await db.select().from(contactSubmissions);
  } catch (error) {
    console.error("[Database] Failed to get contact submissions:", error);
    throw error;
  }
}