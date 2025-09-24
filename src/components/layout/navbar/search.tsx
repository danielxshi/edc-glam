// components/layout/navbar/search.tsx
'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Search as SearchIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Grid from '@/components/grid'
import ProductGridItems from '@/components/layout/product-grid-items'

type Props = {
  linkClassName?: string
  placeholder?: string
  initialQuery?: string
  offsetTopPx?: number
}
type ApiResult = { products: any[]; error?: string }

export default function Search({
  linkClassName,
  placeholder = 'Search products…',
  initialQuery = '',
  offsetTopPx = 0,
}: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(initialQuery)
  const [debounced, setDebounced] = useState(initialQuery)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ApiResult>({ products: [] })
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()

  // Debounce keystrokes (for live results)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 250)
    return () => clearTimeout(t)
  }, [query])

  // Fetch live results from API (unchanged)
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!debounced) {
        setResults({ products: [] })
        setError(null)
        return
      }
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(debounced)}&limit=24`, {
          cache: 'no-store',
          headers: { Accept: 'application/json' },
        })
        let json: ApiResult | null = null
        let text = ''
        const ct = res.headers.get('content-type') || ''
        if (ct.includes('application/json')) json = await res.json()
        else text = await res.text()

        if (!res.ok || !json) throw new Error(json?.error || text || `${res.status} ${res.statusText}`)
        if (!cancelled) setResults(json)
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Search error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [debounced])

  // Focus on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0)
  }, [open])

  // Submit handler for Enter
  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    const q = query.trim()
    if (!q) return
    router.push(`/search?q=${encodeURIComponent(q)}`)
    setOpen(false)
  }

  return (
    <>
      <button
        aria-label="Search"
        className={linkClassName || 'text-xxs hover:opacity-70 transition'}
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="inline-block h-5 w-5 align-middle" />
      </button>

      <Transition show={open} as={Fragment}>
        <Dialog onClose={setOpen} className="relative z-[60]">
          {/* Backdrop */}
          <Transition.Child as={Fragment} enter="transition-opacity duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>

          {/* Full-width panel */}
          <Transition.Child as={Fragment} enter="transition-transform duration-200" enterFrom="-translate-y-3 opacity-0" enterTo="translate-y-0 opacity-100" leave="transition-transform duration-150" leaveFrom="translate-y-0 opacity-100" leaveTo="-translate-y-2 opacity-0">
            <Dialog.Panel
              className="fixed inset-x-0 w-screen rounded-none border-b border-neutral-200 bg-white shadow-xl"
              style={{ top: offsetTopPx }}
            >
              {/* Header row */}
              <form onSubmit={onSubmit} className="flex items-center gap-3 px-4 py-3 sm:px-6">
                <SearchIcon className="my-auto h-5 w-5 text-neutral-600" aria-hidden />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={placeholder}
                  className="h-10 w-full bg-transparent text-sm outline-none"
                  // No need for onKeyDown; Enter will submit the form
                />
                {query && (
                  <button
                    type="button"
                    className="text-xs uppercase tracking-wide text-neutral-600 hover:opacity-70"
                    onClick={() => setQuery('')}
                  >
                    Clear
                  </button>
                )}
                <button aria-label="Close search" type="button" className="rounded p-2 hover:bg-neutral-100" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
                {/* Hidden submit so Enter works on mobile keyboards too */}
                <button type="submit" className="sr-only">Search</button>
              </form>

              <hr className="border-neutral-200" />

              {/* Results */}
              <div className="max-h-[80vh] overflow-auto px-4 pb-8 sm:px-6">
                <div className="mt-4 mb-3 flex items-center justify-between">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-600">Products</h2>
                  {results.products.length > 0 && (
                    <button
                      onClick={() => onSubmit()}
                      className="text-xs uppercase tracking-wide text-neutral-700 hover:opacity-70"
                    >
                      View all results →
                    </button>
                  )}
                </div>

                {error ? (
                  <div className="p-3 text-sm text-red-600">{error}</div>
                ) : loading && !results.products.length ? (
                  <div className="p-3 text-sm text-neutral-500">Searching…</div>
                ) : !debounced ? (
                  <div className="p-3 text-sm text-neutral-500">Start typing to search…</div>
                ) : results.products.length === 0 ? (
                  <div className="p-3 text-sm text-neutral-500">No results.</div>
                ) : (
                  <Grid className="grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    <ProductGridItems products={results.products} />
                  </Grid>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}
