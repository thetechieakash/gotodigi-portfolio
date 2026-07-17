import { useEffect, useState } from 'react'

// Generic fetch hook — pass any api function + optional args
export function useFetch(apiFn, ...args) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false
        setLoading(true)
        setError(null)

        apiFn(...args)
            .then(res => { if (!cancelled) setData(res.data) })
            .catch(err => { if (!cancelled) setError(err.message) })
            .finally(() => { if (!cancelled) setLoading(false) })

        return () => { cancelled = true }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...args])

    return { data, loading, error }
}