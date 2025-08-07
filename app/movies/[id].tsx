import { fetchMovieDetails } from "@/shared/api/tmdb"
import { Image } from "expo-image"
import { useLocalSearchParams } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SymbolView } from "expo-symbols"
import React, { useEffect, useState } from "react"
import { ScrollView, Text, View } from "react-native"
import colors from "tailwindcss/colors"

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

	const getImageUrl = (posterPath: string | null) => {
		if (!posterPath) return "https://placehold.co/600x400/1a1a1a/ffffff.png"
		return `https://image.tmdb.org/t/p/w500${posterPath}`
	}

	return (
		<View className="flex-1 bg-slate-950 ">
			<StatusBar hidden />
			<ScrollView className="pb-20 ">
				<View>
					<Image
						style={{ width: "100%", height: 550 }}
						source={{
							uri: getImageUrl(movie?.poster_path),
						}}
						contentFit="cover"
						cachePolicy="memory-disk"
					/>
				</View>
				<View className="p-5">
					<Text className="text-slate-50 font-bold text-4xl">
						{movie?.title}
					</Text>
					<View className="flex-row justify-start gap-4 mt-4 items-center">
						<View className="flex-row items-center justify-start gap-x-1 bg-slate-800 py-1 px-2 rounded">
							<SymbolView
								name="star.fill"
								tintColor={colors.yellow[500]}
								size={16}
							/>
							<Text className="text-slate-200 text-base font-bold">
								{Math.round(movie.vote_average / 2)}/5{" "}
								<Text className="text-slate-400 font-normal">
									({movie?.vote_count})
								</Text>
							</Text>
						</View>
						<Text className="text-base text-slate-400 font-medium">
							{movie.release_date?.split("-")[0] ?? "–"}
						</Text>
						<Text className="text-base text-slate-400 font-medium">
							{movie.runtime} Minutes
						</Text>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}
