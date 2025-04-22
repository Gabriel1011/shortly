import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const links = await prisma.link.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(links)
}
