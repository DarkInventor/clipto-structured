'use client'

import { useEffect } from 'react'
import { auth } from '../firebaseConfig'
import { useRouter } from 'next/navigation'

export function AuthCheck() {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('Auth state changed:', user ? 'Logged in' : 'Not logged in')
      if (user && window.location.pathname === '/login') {
        router.push('/mockup-home')
      }
    })

    return () => unsubscribe()
  }, [router])

  return null
}

