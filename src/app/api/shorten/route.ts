import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function generateSlug(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export async function POST(request: Request) {
  const body = await request.json()
  const url = body.url

  if (!url || !url.startsWith('http')) {
    return NextResponse.json({ error: 'URL inválida' }, { status: 400 })
  }

  let slug = generateSlug()

  // Garante unicidade
  let exists = await prisma.link.findUnique({ where: { slug } })
  while (exists) {
    slug = generateSlug()
    exists = await prisma.link.findUnique({ where: { slug } })
  }

  const newLink = await prisma.link.create({
    data: {
      slug,
      url,
    },
  })

  return NextResponse.json({ slug: newLink.slug })
}
