'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutButton({
  className = '',
  redirectTo = '/',
  label = 'Logout',
}: {
  className?: string
  redirectTo?: string
  label?: string
}) {
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const onClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {
      // ignore
    } finally {
      setLoading(false)
      router.replace(redirectTo)
      router.refresh()
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={className}
    >
      {loading ? 'Logging out…' : label}
    </button>
  )
}
