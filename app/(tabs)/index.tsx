import { useMovies } from "@/features/movies/model/useMovies"
import { MovieList } from "@/features/movies/ui/MovieList"

export default function Index() {
	const { movies, loading, error } = useMovies("")

	return (
		<MovieList
			title="Latest Movies"
			movies={movies}
			loading={loading}
			error={error}
		/>
	)
}
