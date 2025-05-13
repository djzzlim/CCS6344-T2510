// app/api/user/me/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
    const sessionId = (await cookies()).get('session_id')?.value;

    if (!sessionId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Find the session and include the associated user
        const session = await prisma.session.findUnique({
            where: { SessionID: sessionId },
            include: {
                user: true // Include the full user data
            }
        });

        if (!session) {
            return NextResponse.json({ error: 'Session not found' }, { status: 401 });
        }

        // Extract user details, excluding sensitive information
        const { PasswordHash, ...userDetails } = session.user;

        return NextResponse.json({
            firstName: userDetails.FirstName,
            lastName: userDetails.LastName,
            email: userDetails.Email,
            role: userDetails.Role
        });
    } catch (error) {
        console.error('[USER ME ERROR]', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}