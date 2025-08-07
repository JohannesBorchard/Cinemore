import { fetchMovieDetails } from "@/shared/api/tmdb"
import { useLocalSearchParams } from "expo-router"
import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"

export default function MovieDetails() {
	const { id } = useLocalSearchParams()
	const [movie, setMovie] = useState<MovieDetails | null>(null)

	useEffect(() => {
		if (typeof id === "string") {
			fetchMovieDetails(id).then(setMovie).catch(console.error)
		} else if (Array.isArray(id)) {
			fetchMovieDetails(id[0]).then(setMovie).catch(console.error)
		}
	}, [id])

	if (!movie) {
		return <Text>Loading...</Text>
	}

	return (
		<View className="flex-1 bg-slate-950 pt-32">
			<Text className="text-slate-200">Details for: {movie.id}</Text>
			<Text className="text-slate-200">{movie.title}</Text>
		</View>
	)
}
