import { useState, useEffect } from "react"
import { fetchStrapi } from "@/lib/strapi" 

interface UseFetchResult<T> {
  data:    T | null
  loading: boolean
  error:   Error | null
  refetch: () => void
}

/**
 * @param path   
 * @param locale 
 */
export function useFetch<T>(path: string, locale?: string): UseFetchResult<T> {
  const [data, setData]       = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError]     = useState<Error | null>(null)
  const [tick, setTick]       = useState(0)

  const refetch = () => setTick((t) => t + 1)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      setLoading(true)
      setError(null)

      try {
        const json = (await fetchStrapi(path, locale)) as T
        if (!cancelled) setData(json)
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err : new Error("Unknown error"))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    run()
    return () => { cancelled = true }
  }, [path, locale, tick])

  return { data, loading, error, refetch }
}