import { fetchMovies } from "@/shared/api/tmdb"
import { useFetch } from "@/shared/model/useFetch"
import { useCallback } from "react"

export function useMovies(query: string = "") {
	const fetchMoviesCallback = useCallback(() => fetchMovies({ query }), [query])

	const {
		data: movies,
		loading,
		error,
	} = useFetch<Movie[]>(fetchMoviesCallback)

	return {
		movies: movies || [],
		loading,
		error,
	}
}
