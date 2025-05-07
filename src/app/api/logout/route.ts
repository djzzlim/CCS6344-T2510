// app/api/logout/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assuming you're using Prisma to interact with your database
import { cookies } from 'next/headers'; // For cookie management

export async function POST(req: Request) {
    const sessionId = req.cookies.get('session_id');

    if (!sessionId) {
        // No session found, so the user is already logged out
        return NextResponse.json({ message: 'Already logged out' });
    }

    try {
        // Delete the session from the database
        await prisma.session.delete({
            where: {
                SessionID: sessionId.value,
            },
        });

        // Clear the session cookie
        const response = NextResponse.json({ message: 'Logged out successfully' });

        response.cookies.set('session_id', '', {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: new Date(0), // Immediately expire
        });

        return response;
    } catch (error) {
        console.error('[LOGOUT ERROR]', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
