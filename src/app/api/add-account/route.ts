import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json();
    let { accountType } = body;
    
    // Validate account type and ensure proper capitalization
    if (!accountType || !['Checking', 'Savings'].includes(accountType)) {
      return NextResponse.json({ 
        message: 'Valid account type (Checking or Savings) is required' 
      }, { status: 400 });
    }
    
    // Ensure proper capitalization - convert to the exact string format we want to store
    if (accountType.toLowerCase() === 'checking') {
      accountType = 'Checking';
    } else if (accountType.toLowerCase() === 'savings') {
      accountType = 'Savings';
    }
    
    // Get session cookie
    const cookieStore = cookies();
    const sessionId = cookieStore.get('session_id')?.value;
    
    if (!sessionId) {
      return NextResponse.json({ 
        message: 'Authentication required' 
      }, { status: 401 });
    }
    
    // Find valid session
    const session = await prisma.session.findUnique({
      where: {
        SessionID: sessionId,
        ExpiresAt: { gt: new Date() } // Session hasn't expired
      },
      include: {
        user: true // Include user details
      }
    });
    
    if (!session) {
      return NextResponse.json({ 
        message: 'Invalid or expired session' 
      }, { status: 401 });
    }
    
    // Generate account ID with prefix based on type
    const prefix = accountType === 'Checking' ? 'CHK' : 'SAV';
    const randomDigits = Math.floor(10000000 + Math.random() * 90000000).toString();
    const accountId = `${prefix}-${randomDigits}`;
    
    // Create the account - ensure accountType is explicitly set to the correctly capitalized string
    // Only include fields that exist in your schema
    const account = await prisma.account.create({
      data: {
        AccountID: accountId,
        UserID: session.UserID,
        AccountType: accountType,
        Balance: 0,
        Status: 'Active',
      }
    });
    
    // Add audit log with correctly capitalized account type
    await prisma.aUDIT_LOGS.create({
      data: {
        actor_type: session.user.Role,
        actor_id: session.UserID,
        action: `Created ${accountType} account`,
        target_id: accountId,
        status: 'success'
      }
    });
    
    return NextResponse.json({
      message: 'Account created successfully',
      account: {
        id: account.AccountID,
        type: account.AccountType,
        balance: account.Balance
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('[ADD ACCOUNT ERROR]', error);
    
    // Add failed audit log if possible
    try {
      const sessionId = cookies().get('session_id')?.value;
      if (sessionId) {
        const session = await prisma.session.findUnique({
          where: { SessionID: sessionId }
        });
        
        if (session) {
          await prisma.aUDIT_LOGS.create({
            data: {
              actor_type: 'User',
              actor_id: session.UserID,
              action: 'Failed to create account',
              status: 'error'
            }
          });
        }
      }
    } catch (auditError) {
      console.error('[AUDIT LOG ERROR]', auditError);
    }
    
    return NextResponse.json({ 
      message: 'An error occurred while creating the account' 
    }, { status: 500 });
  }
}