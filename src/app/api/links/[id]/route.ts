import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const { id } = resolvedParams

  const body = await req.json()

  const updated = await prisma.link.update({
    where: { id: Number(id) },
    data: {
      url: body.url,
      slug: body.slug,
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const { id } = resolvedParams

  await prisma.link.delete({
    where: { id: Number(id) },
  })

  return NextResponse.json({ success: true })
}