// src/app/api/test-db/route.ts
import { PrismaClient } from '@/generated/prisma'; // or '@prisma/client' if you're using default path

const prisma = new PrismaClient();

export async function GET(): Promise<Response> {
  try {
    await prisma.$connect();
    return new Response('✅ Connected to SQL Server successfully!');
  } catch (err) {
    console.error('❌ Prisma connection error:', err);
    return new Response('❌ Failed to connect to SQL Server', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
