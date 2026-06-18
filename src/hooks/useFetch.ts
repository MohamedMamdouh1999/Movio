import { useEffect, useState } from "react"

const API_BASE_URL = 'https://api.themoviedb.org/3/';
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`
    }
};

const useFetch = <T,>(endpoint: string) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        if (!endpoint) return;

        const controller = new AbortController();
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...API_OPTIONS, signal: controller.signal });
                if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);

                const result = await response.json();
                setData(result);
            } catch (err) {
                if (err instanceof Error && err.name !== 'AbortError') setError(err.message);
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        fetchData();
        return () => controller.abort();
    }, [endpoint]);

    return { data, isLoading, error };
}

export default useFetch;