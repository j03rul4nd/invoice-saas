'use client'

import { useAuth } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Lock, User } from 'lucide-react'

interface AuthRequiredPopupProps {
  showDelay?: number // Delay en milisegundos antes de mostrar el popup
}

export default function AuthRequiredPopup({ showDelay = 2000 }: AuthRequiredPopupProps) {
  const { isSignedIn, isLoaded } = useAuth()
  const [showPopup, setShowPopup] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Solo mostrar el popup si:
    // 1. Clerk ha cargado
    // 2. El usuario no está autenticado
    // 3. No se ha mostrado ya el popup en esta sesión
    if (isLoaded && !isSignedIn && !hasShown) {
      const timer = setTimeout(() => {
        setShowPopup(true)
        setHasShown(true)
      }, showDelay)

      return () => clearTimeout(timer)
    }
  }, [isLoaded, isSignedIn, hasShown, showDelay])

  // No renderizar nada si el usuario está autenticado o Clerk no ha cargado
  if (!isLoaded || isSignedIn || !showPopup) {
    return null
  }

  const closePopup = () => {
    setShowPopup(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-200">
        {/* Close button */}
        <button
          onClick={closePopup}
          className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close popup"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-blue-100 p-3">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-3 text-center text-xl font-semibold text-gray-900">
          Sign In Required
        </h2>

        {/* Description */}
        <p className="mb-6 text-center text-gray-600 leading-relaxed">
          To access all dashboard features and functionality, you need to sign in to your account. 
          Without authentication, the dashboard features won't work properly.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href="/sign-in"
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors duration-200"
          >
            <User className="h-4 w-4" />
            Sign In to Continue
          </Link>
          
          <button
            onClick={closePopup}
            className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Close and Browse
          </button>
        </div>

        {/* Additional info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Don't have an account?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:underline font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}