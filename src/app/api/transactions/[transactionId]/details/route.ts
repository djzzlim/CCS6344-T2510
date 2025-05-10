import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    context: { params: Promise<{ transactionId: string }> }
) {
    const params = await context.params;
    const transactionId = params.transactionId;

    try {
        // First, try to find the transaction in the Transfer model
        const transfer = await prisma.transfer.findUnique({
            where: {
                TransferID: transactionId,
            },
            include: {
                fromAccount: {
                    include: {
                        user: {
                            select: {
                                UserID: true,
                                FirstName: true,
                                LastName: true,
                                Email: true,
                                ContactNumber: true,
                                AddressLine1: true,
                                AddressLine2: true,
                                City: true,
                                State: true,
                                ZipCode: true,
                                AccountOpenDate: true,
                                accounts: {
                                    select: {
                                        AccountID: true,
                                        AccountType: true,
                                        Balance: true,
                                        Status: true,
                                    },
                                },
                            },
                        },
                    },
                },
                toAccount: true,
            },
        });

        // If found in Transfer, format and return the data
        if (transfer) {
            // Format data to match the expected structure in the frontend
            const formattedTransaction = {
                id: transfer.TransferID,
                type: transfer.TransferType?.toLowerCase() || 'transfer',
                status: transfer.Status?.toLowerCase() || 'pending',
                amount: Number(transfer.Amount) || 0,
                updatedAt: transfer.UpdatedAt || new Date(),
                createdAt: transfer.CreatedAt || new Date(),
                description: transfer.Description || '',

                // Format user data
                user: transfer.fromAccount?.user ? {
                    id: transfer.fromAccount.user.UserID,
                    name: `${transfer.fromAccount.user.FirstName || ''} ${transfer.fromAccount.user.LastName || ''}`.trim(),
                    email: transfer.fromAccount.user.Email || '',
                    phone: transfer.fromAccount.user.ContactNumber,
                    address: transfer.fromAccount.user.AddressLine1 ?
                        `${transfer.fromAccount.user.AddressLine1}, ${transfer.fromAccount.user.City || ''}, ${transfer.fromAccount.user.State || ''} ${transfer.fromAccount.user.ZipCode || ''}`.trim() :
                        undefined,
                    accountOpenDate: transfer.fromAccount.user.AccountOpenDate,
                    accounts: transfer.fromAccount.user.accounts.map(account => ({
                        id: account.AccountID,
                        number: account.AccountID.substring(account.AccountID.length - 4).padStart(account.AccountID.length, '*'),
                        type: account.AccountType?.toLowerCase() || 'unknown',
                        balance: Number(account.Balance) || 0
                    }))
                } : undefined,

                // Format account data
                fromAccount: transfer.fromAccount ? {
                    id: transfer.fromAccount.AccountID,
                    number: transfer.fromAccount.AccountID.substring(transfer.fromAccount.AccountID.length - 4).padStart(transfer.fromAccount.AccountID.length, '*'),
                    balance: Number(transfer.fromAccount.Balance) || 0
                } : undefined,

                toAccount: transfer.toAccount ? {
                    id: transfer.toAccount.AccountID,
                    number: transfer.toAccount.AccountID.substring(transfer.toAccount.AccountID.length - 4).padStart(transfer.toAccount.AccountID.length, '*'),
                    balance: Number(transfer.toAccount.Balance) || 0
                } : undefined
            };

            return NextResponse.json(formattedTransaction);
        }

        // If not found in Transfer, try to find in Payment
        const payment = await prisma.payment.findUnique({
            where: {
                PaymentID: transactionId,
            },
            include: {
                account: {
                    include: {
                        user: {
                            select: {
                                UserID: true,
                                FirstName: true,
                                LastName: true,
                                Email: true,
                                ContactNumber: true,
                                AddressLine1: true,
                                AddressLine2: true,
                                City: true,
                                State: true,
                                ZipCode: true,
                                AccountOpenDate: true,
                                accounts: {
                                    select: {
                                        AccountID: true,
                                        AccountType: true,
                                        Balance: true,
                                        Status: true,
                                    },
                                },
                            },
                        },
                    },
                },
                utility: true,
            },
        });

        // If found in Payment, format and return the data
        if (payment) {
            const formattedPayment = {
                id: payment.PaymentID,
                type: 'payment',
                status: 'completed', // Assuming payments are always completed, adjust if needed
                amount: Number(payment.Amount) || 0,
                updatedAt: payment.Timestamp || new Date(),
                createdAt: payment.Timestamp || new Date(),
                description: payment.Description || `Utility payment to ${payment.utility?.AccountName || 'unknown'}`,

                // Format user data
                user: payment.account?.user ? {
                    id: payment.account.user.UserID,
                    name: `${payment.account.user.FirstName || ''} ${payment.account.user.LastName || ''}`.trim(),
                    email: payment.account.user.Email || '',
                    phone: payment.account.user.ContactNumber,
                    address: payment.account.user.AddressLine1 ?
                        `${payment.account.user.AddressLine1}, ${payment.account.user.City || ''}, ${payment.account.user.State || ''} ${payment.account.user.ZipCode || ''}`.trim() :
                        undefined,
                    accountOpenDate: payment.account.user.AccountOpenDate,
                    accounts: payment.account.user.accounts.map(account => ({
                        id: account.AccountID,
                        number: account.AccountID.substring(account.AccountID.length - 4).padStart(account.AccountID.length, '*'),
                        type: account.AccountType?.toLowerCase() || 'unknown',
                        balance: Number(account.Balance) || 0
                    }))
                } : undefined,

                // Format account data
                fromAccount: payment.account ? {
                    id: payment.account.AccountID,
                    number: payment.account.AccountID.substring(payment.account.AccountID.length - 4).padStart(payment.account.AccountID.length, '*'),
                    balance: Number(payment.account.Balance) || 0
                } : undefined,

                // Format utility data as the recipient
                toAccount: payment.utility ? {
                    id: payment.utility.UtilityID,
                    number: payment.utility.AccountNumber,
                    name: payment.utility.AccountName || 'Utility Service',
                    type: 'utility'
                } : undefined
            };

            return NextResponse.json(formattedPayment);
        }

        // If not found in either Transfer or Payment
        return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    } catch (error) {
        console.error('Error fetching transaction details:', error);
        return NextResponse.json({ error: 'Failed to fetch transaction details' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}