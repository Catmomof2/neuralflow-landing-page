import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, emailSignups, InsertEmailSignup, contactSubmissions, InsertContactSubmission } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
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
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
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

export async function getEmailSignups(status?: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get email signups: database not available");
    return [];
  }

  try {
    if (status) {
      return await db.select().from(emailSignups).where(eq(emailSignups.status, status as any));
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

export async function getContactSubmissions(status?: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get contact submissions: database not available");
    return [];
  }

  try {
    if (status) {
      return await db.select().from(contactSubmissions).where(eq(contactSubmissions.status, status as any));
    }
    return await db.select().from(contactSubmissions);
  } catch (error) {
    console.error("[Database] Failed to get contact submissions:", error);
    throw error;
  }
}
