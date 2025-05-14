import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUserId } from '@/lib/auth';

const prisma = new PrismaClient();

// GET - List audit logs
export async function GET(request: Request) {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get the user with role
    const user = await prisma.user.findUnique({
      where: { UserID: userId },
      select: { Role: true, UserID: true }
    });

    // Check if user is admin
    if (!user || user.Role !== 'Admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get URL parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const actorType = searchParams.get('actorType');
    const action = searchParams.get('action');

    // Build where clause
    const where: any = {};
    if (startDate) {
      where.timestamp = {
        ...where.timestamp,
        gte: new Date(startDate)
      };
    }
    if (endDate) {
      where.timestamp = {
        ...where.timestamp,
        lte: new Date(endDate)
      };
    }
    if (actorType) {
      where.actor_type = actorType;
    }
    if (action) {
      where.action = {
        contains: action
      };
    }

    // Get audit logs with pagination
    const [logs, total] = await Promise.all([
      prisma.aUDIT_LOGS.findMany({
        where,
        orderBy: {
          timestamp: 'desc'
        },
        skip: offset,
        take: limit
      }),
      prisma.aUDIT_LOGS.count({ where })
    ]);

    // Log this access in audit logs
    await prisma.aUDIT_LOGS.create({
      data: {
        actor_type: 'Admin',
        actor_id: user.UserID,
        action: 'Viewed audit logs',
        status: 'success'
      }
    });

    return NextResponse.json({
      logs,
      pagination: {
        total,
        offset,
        limit
      }
    });
  } catch (error) {
    console.error('Error in audit logs API:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 