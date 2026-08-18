import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { sendFolderCreatedEmail } from '@/lib/email';

const createFolderSchema = z.object({
  name: z.string().min(1),
  files: z.array(z.any()).optional(),
});

// GET all folders for current user
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Users can only see their own folders (or admins see all)
    const where = session.role === 'ADMIN'
      ? {}
      : { userId: session.userId };

    const folders = await prisma.folder.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ folders });
  } catch (error) {
    console.error('Get folders error:', error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}

// POST create new folder
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, files } = createFolderSchema.parse(body);

    const folder = await prisma.folder.create({
      data: {
        userId: session.userId,
        name,
        files: files || [],
        status: 'NEW',
      },
    });

    // Get user information for email
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { email: true, name: true },
    });

    if (user) {
      // Send folder created email (don't await to avoid slowing down response)
      sendFolderCreatedEmail(user.email, user.name, folder.name).catch((error) => {
        console.error('Failed to send folder created email:', error);
      });
    }

    return NextResponse.json({ folder });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    console.error('Create folder error:', error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}
