import { useMovies } from "@/features/movies/model/useMovies"
import { MovieList } from "@/features/movies/ui/MovieList"
import React from "react"
import { Text, View } from "react-native"

const Search = () => {
	const { movies, loading, error } = useMovies("")

	return (
		<View className="flex-1  items-center">
			<Text className="text-purple-400 font-bold text-2xl">Search</Text>
			<MovieList movies={movies} loading={loading} error={error} />
		</View>
	)
}

export default Search
