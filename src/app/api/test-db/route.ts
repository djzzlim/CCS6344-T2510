import { PrismaClient } from '@/generated/prisma'; // or '@prisma/client' if you're using default path

const prisma = new PrismaClient();

export async function GET(): Promise<Response> {
  try {
    await prisma.$connect();

    // Fetch all customers
    const customers = await prisma.customer.findMany();

    // Fetch all accounts (if needed)
    const accounts = await prisma.account.findMany();

    // Fetch all transfers (if needed)
    const transfers = await prisma.transfer.findMany();

    // Fetch all payments (if needed)
    const payments = await prisma.payment.findMany();

    // Combine all data into one response
    const data = {
      customers,
      accounts,
      transfers,
      payments,
    };

    // Return all data as a JSON response
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('❌ Prisma connection error:', err);
    return new Response('❌ Failed to connect to SQL Server or fetch data', {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
