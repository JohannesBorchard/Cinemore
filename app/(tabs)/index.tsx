import { useMovies } from "@/features/movies/model/useMovies"
import { MovieList } from "@/features/movies/ui/MovieList"
import { SearchSection } from "@/features/search/context/ui/SearchSection"

export default function Index() {
	const { movies, loading, error } = useMovies("")

	return (
		<MovieList
			title="Latest Movies"
			movies={movies}
			loading={loading}
			error={error}
			ListHeaderComponent={
				<>
					<SearchSection isSearchPage={false} />
				</>
			}
		/>
	)
}
