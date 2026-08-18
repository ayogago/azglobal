import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            orders: true,
            folders: true,
          },
        },
        orders: {
          select: {
            status: true,
            isPaid: true,
          },
        },
        folders: {
          select: {
            status: true,
            isPaid: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate stats for each client
    const clientsWithStats = users.map((user) => {
      const activeFolders = user.folders.filter(
        (f) => f.status === 'NEW' || f.status === 'PENDING'
      ).length;
      const unpaidFolders = user.folders.filter((f) => !f.isPaid).length;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || 'N/A',
        role: user.role,
        totalOrders: user._count.orders,
        totalFolders: user._count.folders,
        activeFolders,
        unpaidFolders,
        joinDate: new Date(user.createdAt).toISOString().split('T')[0],
      };
    });

    return NextResponse.json({ clients: clientsWithStats });
  } catch (error) {
    console.error('Get clients error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}
