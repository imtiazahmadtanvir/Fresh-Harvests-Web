"use client"

import { CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface NotificationProps {
  isVisible: boolean
  message: string
  type: "success" | "error"
  onClose: () => void
}

export function Notification({ isVisible, message, type, onClose }: NotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000) // Auto close after 3 seconds

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-[100001] animate-in slide-in-from-top-2">
      <div
        className={`flex items-center gap-3 p-4 rounded-lg shadow-lg border ${
          type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
        }`}
      >
        <CheckCircle className="w-5 h-5 text-green-600" />
        <span className="font-medium">{message}</span>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 hover:bg-transparent">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
