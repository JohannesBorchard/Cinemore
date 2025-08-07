import { useMovies } from "@/features/movies/model/useMovies"
import { MovieList } from "@/features/movies/ui/MovieList"
import { View } from "react-native"

export default function Index() {
	const { movies, loading, error } = useMovies("") // Leer für Latest Movies

	return (
		<View className="flex-1 pt-28">
			<MovieList
				title="Latest Movies"
				movies={movies}
				loading={loading}
				error={error}
				isSearchPage={false} // Nur Pressable SearchBar
			/>
		</View>
	)
}
