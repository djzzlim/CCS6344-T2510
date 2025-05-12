import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Define validation schema for the request body
const transferToUtilitySchema = z.object({
  accountId: z.string().min(1, "Account ID is required"),
  utilityId: z.string().min(1, "Utility ID is required"),
  amount: z.number().positive("Amount must be positive"),
  description: z.string().optional()
});

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await req.json();
    const result = transferToUtilitySchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues }, { status: 400 });
    }
    
    const { accountId, utilityId, amount, description } = result.data;
    
    // Retrieve the account to check balance
    const account = await prisma.account.findUnique({
      where: { AccountID: accountId }
    });
    
    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }
    
    // Check if the account has sufficient balance
    if (!account.Balance || account.Balance < amount) {
      return NextResponse.json({ error: "Insufficient funds" }, { status: 400 });
    }
    
    // Verify the utility exists
    const utility = await prisma.utilities.findUnique({
      where: { UtilityID: utilityId }
    });
    
    if (!utility) {
      return NextResponse.json({ error: "Utility not found" }, { status: 404 });
    }
    
    // Use a transaction to ensure both operations complete or none do
    const transaction = await prisma.$transaction([
      // Create payment record
      prisma.payment.create({
        data: {
          AccountID: accountId,
          UtilityID: utilityId,
          Amount: amount,
          Description: description || `Payment to ${utility.AccountName}`,
          Timestamp: new Date()
        }
      }),
      
      // Update account balance
      prisma.account.update({
        where: { AccountID: accountId },
        data: {
          Balance: {
            decrement: amount
          }
        }
      }),
      
      // Log the transaction in audit logs
      prisma.aUDIT_LOGS.create({
        data: {
          actor_type: "USER",
          actor_id: account.UserID || "SYSTEM",
          action: "UTILITY_PAYMENT",
          target_id: utilityId,
          status: "SUCCESS"
        }
      })
    ]);
    
    return NextResponse.json({
      success: true,
      message: `Successfully transferred $${amount} to ${utility.AccountName}`,
      payment: transaction[0]
    }, { status: 200 });
    
  } catch (error) {
    console.error("Transfer API error:", error);
    return NextResponse.json({ 
      error: "Failed to process transfer", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}