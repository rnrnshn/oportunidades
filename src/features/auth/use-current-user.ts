import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { fetchCurrentUser } from '@/features/auth/api'

const DEMO_USER = {
  id: 'demo-user',
  name: 'Amélia Mucavele',
  email: 'amelia@exemplo.co.mz',
  role: 'user',
}

export function useCurrentUser() {
  const [isLocalDemo, setIsLocalDemo] = useState(false)

  useEffect(() => {
    setIsLocalDemo(['localhost', '127.0.0.1'].includes(window.location.hostname))
  }, [])

  return useQuery({
    queryKey: ['auth', 'current-user', isLocalDemo ? 'demo' : 'live'],
    queryFn: isLocalDemo ? async () => DEMO_USER : fetchCurrentUser,
    retry: false,
  })
}
