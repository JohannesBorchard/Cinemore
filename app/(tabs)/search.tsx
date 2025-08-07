import { useMovies } from "@/features/movies/model/useMovies"
import { MovieList } from "@/features/movies/ui/MovieList"
import { useSearch } from "@/features/search/context/SearchContext"
import { View } from "react-native"

export default function Search() {
	const { searchTerm } = useSearch()
	const { movies, loading, error } = useMovies(searchTerm)

	const title = searchTerm ? `Search for '${searchTerm}'` : "Search Movies"

	return (
		<View className="flex-1 pt-28">
			<MovieList
				title={title}
				movies={movies}
				loading={loading}
				error={error}
				isSearchPage={true}
			/>
		</View>
	)
}
