import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [Error, setError] = useState(null)
  const [IsLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()


  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save user into local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update auth context
      dispatch({ type: 'LOGIN', payload: json })
      setIsLoading(false)
    }
  }
  return { signup, Error, IsLoading, }
}