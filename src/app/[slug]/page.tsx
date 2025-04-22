import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function RedirectPage({ params }: PageProps) {
  const { slug } = await params

  const link = await prisma.link.findUnique({
    where: {
      slug,
    },
  })

  if (link) {
    await prisma.link.update({
      where: { id: link.id },
      data: { visits: { increment: 1 } },
    })
    redirect(link.url)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <h1 className="text-2xl font-bold">Link não encontrado 😢</h1>
    </div>
  )
}
