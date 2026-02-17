"use client"

import { useState, useEffect } from "react"
import { Wifi, WifiOff } from "lucide-react"

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (!mounted) {
    return (
      <div
        className="flex h-8 w-8 items-center justify-center rounded-md"
        aria-hidden="true"
      >
        <Wifi className="h-4 w-4 text-muted-foreground" />
      </div>
    )
  }

  if (isOnline) {
    return (
      <div
        className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        aria-label="Online"
        title="Online"
      >
        <Wifi className="h-3.5 w-3.5" />
        <span className="text-xs font-medium hidden sm:inline">Online</span>
      </div>
    )
  }

  return (
    <div
      className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-red-500/15 text-red-600 dark:text-red-400 animate-pulse"
      aria-label="Offline"
      title="Offline - Keine Internetverbindung"
    >
      <WifiOff className="h-3.5 w-3.5" />
      <span className="text-xs font-medium hidden sm:inline">Offline</span>
    </div>
  )
}
