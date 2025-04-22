'use client'

import { useEffect, useState } from 'react'

type Link = {
  id: number
  slug: string
  url: string
  visits: number
}

export default function Home() {
  const [url, setUrl] = useState('')
  const [links, setLinks] = useState<Link[]>([])
  const [editing, setEditing] = useState<Link | null>(null)
  const [error, setError] = useState('')

  const fetchLinks = async () => {
    const res = await fetch('/api/links')
    const data = await res.json()
    setLinks(data)
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('') // limpa erro antigo

    if (!url) {
      setError('Por favor, insira uma URL.')
      return
    }

    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Erro ao encurtar a URL.')
      return
    }

    setUrl('')
    await fetchLinks()
  }

  const handleDelete = async (id: number) => {
    await fetch(`/api/links/${id}`, { method: 'DELETE' })
    fetchLinks()
  }

  const handleUpdate = async () => {
    if (!editing) return

    await fetch(`/api/links/${editing.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: editing.url, slug: editing.slug }),
    })

    setEditing(null)
    fetchLinks()
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-neutral-900 text-neutral-900 dark:text-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">🔗 Encortei</h1>

        {/* Formulário de criação */}
        <div className="bg-white dark:bg-neutral-800 shadow-md rounded-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="url"
              placeholder="Digite sua URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
            >
              Encurtar
            </button>
          </form>

          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>

        {/* Lista de links */}
        <div className="bg-white dark:bg-neutral-800 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Links encurtados</h2>
          {links.length === 0 ? (
            <p className="text-neutral-500">Nenhum link criado ainda.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300">
                  <tr>
                    <th className="px-4 py-3 text-left">URL</th>
                    <th className="px-4 py-3 text-left">Slug</th>
                    <th className="px-4 py-3 text-center">Visitas</th>
                    <th className="px-4 py-3 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link) => (
                    <tr
                      key={link.id}
                      className="border-t border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700"
                    >
                      <td className="px-4 py-2 truncate max-w-[300px]">{link.url}</td>
                      <td className="px-4 py-2">
                        <a
                          href={`/${link.slug}`}
                          target="_blank"
                          className="text-blue-500 hover:underline"
                        >
                          {link.slug}
                        </a>
                      </td>
                      <td className="px-4 py-2 text-center">{link.visits}</td>
                      <td className="px-4 py-2 text-center space-x-2">
                        <button
                          onClick={() => setEditing(link)}
                          className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-black rounded-md"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(link.id)}
                          className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md"
                        >
                          Deletar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Formulário de edição */}
        {editing && (
          <div className="mt-10 bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Editar link</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={editing.url}
                onChange={(e) => setEditing({ ...editing, url: e.target.value })}
                className="px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-900"
                placeholder="Nova URL"
              />
              <input
                type="text"
                value={editing.slug}
                onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                className="px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-900"
                placeholder="Novo slug"
              />
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleUpdate}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Salvar
              </button>
              <button
                onClick={() => setEditing(null)}
                className="bg-neutral-400 hover:bg-neutral-500 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
