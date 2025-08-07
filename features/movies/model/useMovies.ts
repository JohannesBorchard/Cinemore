import { fetchMovies } from "@/shared/api/tmdb"
import { useFetch } from "@/shared/model/useFetch"
import { useCallback, useEffect } from "react"

export function useMovies(query: string = "") {
	const fetchMoviesCallback = useCallback(() => fetchMovies({ query }), [query])

	const {
		data: movies,
		loading,
		error,
		refetch,
	} = useFetch<Movie[]>(fetchMoviesCallback)

	// Re-fetch wenn sich query ändert
	useEffect(() => {
		refetch()
	}, [query, refetch])

	return {
		movies: movies || [],
		loading,
		error,
		refetch,
	}
}
