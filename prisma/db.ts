import "dotenv/config";
import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const adapter = new PrismaLibSQL(client);
export const db =
  globalForPrisma.prisma ?? new PrismaClient({ adapter, log: ["query"] });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}
