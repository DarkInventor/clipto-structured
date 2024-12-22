import { useState, useEffect } from 'react'
import { User, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const idToken = await userCredential.user.getIdToken()
      
      // Send the ID token to the server to create a session
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      })

      if (response.ok) {
        router.push('/mockup-home')
      } else {
        throw new Error('Failed to create session')
      }
    } catch (error) {
      console.error('Login failed', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      await fetch('/api/session', { method: 'DELETE' })
      router.push('/login')
    } catch (error) {
      console.error('Logout failed', error)
      throw error
    }
  }

  return { user, signIn, signOut }
}

