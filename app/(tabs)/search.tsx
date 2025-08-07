import { useMovies } from "@/features/movies/model/useMovies"
import { MovieList } from "@/features/movies/ui/MovieList"
import React from "react"
import { View } from "react-native"

const Search = () => {
	const { movies, loading, error } = useMovies("Superman")

	return (
		<View className="flex-1">
			<MovieList
				title="Movies for 'Superman'"
				movies={movies}
				loading={loading}
				error={error}
			/>
		</View>
	)
}

export default Search
