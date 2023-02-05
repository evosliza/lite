import { PrismaClient } from '@prisma/client';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 * https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#solution
 */
type Global = typeof global;
interface GlobalWithPrismaClient extends Global {
  prismaClient: PrismaClient | undefined;
}

export const prismaClient: PrismaClient =
  (global as GlobalWithPrismaClient).prismaClient ?? new PrismaClient();

if (process.env['NODE_ENV'] !== 'production') {
  (global as GlobalWithPrismaClient).prismaClient = prismaClient;
}

export default prismaClient;
