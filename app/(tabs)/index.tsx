import { useMovies } from "@/features/movies/model/useMovies"
import { MovieList } from "@/features/movies/ui/MovieList"
import { View } from "react-native"

export default function Index() {
	const { movies, loading, error } = useMovies("")

	return (
		<View className="flex-1 pt-32">
			<MovieList movies={movies} loading={loading} error={error} />
		</View>
	)
}
