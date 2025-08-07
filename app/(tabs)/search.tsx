import { useMovies } from "@/features/movies/model/useMovies"
import { MovieList } from "@/features/movies/ui/MovieList"
import { useSearch } from "@/features/search/context/SearchContext"
import { SearchSection } from "@/features/search/context/ui/SearchSection"

export default function Search() {
	const { searchTerm } = useSearch()
	const { movies, loading, error } = useMovies(searchTerm)

	const title = searchTerm ? `Search for '${searchTerm}'` : "Search Movies"

	return (
		<MovieList
			movies={movies}
			loading={loading}
			error={error}
			ListHeaderComponent={
				<>
					<SearchSection isSearchPage />
					{/* optional Fehler/Loading-Zustände */}
					{/* <LoadingErrorState loading={loading} error={error} /> */}
				</>
			}
			title={title}
		/>
	)
}
