import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json()

  const updated = await prisma.link.update({
    where: { id: Number(params.id) },
    data: {
      url: body.url,
      slug: body.slug,
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.link.delete({
    where: { id: Number(params.id) },
  })

  return NextResponse.json({ success: true })
}
