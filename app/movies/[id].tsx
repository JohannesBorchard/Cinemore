import { fetchMovieDetails } from "@/shared/api/tmdb"
import { BlurView } from "expo-blur"
import { router, useLocalSearchParams } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SymbolView } from "expo-symbols"
import React, { useEffect, useRef, useState } from "react"
import { Animated, Text, TouchableOpacity, View } from "react-native"
import colors from "tailwindcss/colors"

export default function MovieDetails() {
	const { id } = useLocalSearchParams()
	const [movie, setMovie] = useState<MovieDetails | null>(null)
	const scrollY = useRef(new Animated.Value(0)).current

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

	const imageHeight = 550
	const animatedImageStyle = {
		transform: [
			{
				scale: scrollY.interpolate({
					inputRange: [-200, 0, 1],
					outputRange: [1.4, 1, 1],
					extrapolateRight: "clamp",
				}),
			},
			{
				translateY: scrollY.interpolate({
					inputRange: [-200, 0, 1],
					outputRange: [-80, 0, 0], // Bewegt das Bild nach oben beim Zoomen
					extrapolateRight: "clamp",
				}),
			},
		],
	}

	return (
		<View className="flex-1 bg-slate-950">
			<StatusBar hidden />
			<Animated.ScrollView
				bounces
				showsVerticalScrollIndicator={false}
				scrollEventThrottle={16}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: true }
				)}>
				<Animated.Image
					source={{ uri: getImageUrl(movie?.poster_path) }}
					style={[{ width: "100%", height: imageHeight }, animatedImageStyle]}
					resizeMode="cover"
				/>

				<View className="p-5">
					<MovieDetailsMeta movie={movie} />
					<MovieInfo label="Overview" value={movie?.overview} />
					<MovieInfo
						label="Genres"
						value={movie?.genres.map((g) => g.name).join(", ")}
					/>
					<View className="flex flex-row justify-between gap-3 w-1/2">
						<MovieInfo
							label="Budget"
							value={`$${movie?.budget / 1_000_000} million`}
						/>
						<MovieInfo
							label="Revenue"
							value={`$${Math.round(movie?.revenue) / 1_000_000} million`}
						/>
					</View>
					<MovieInfo
						label="Production Companies"
						value={
							movie?.production_companies.map((c) => c.name).join(", ") || "N/A"
						}
					/>
				</View>
			</Animated.ScrollView>
			<TouchableOpacity
				onPress={() => router.back()}
				activeOpacity={0.9}
				className="flex-row items-center justify-center gap-2 rounded-lg p-4 absolute bottom-10 self-center overflow-hidden">
				<BlurView intensity={80} tint="dark" className="absolute inset-0" />
				<SymbolView name="chevron.backward" size={20} tintColor={"white"} />
				<Text className="text-slate-100 text-lg">Back to All Movies</Text>
			</TouchableOpacity>
		</View>
	)
}

function MovieDetailsMeta({ movie }: { movie: MovieDetails }) {
	return (
		<View>
			<Text className="text-slate-50 font-bold text-4xl my-3">
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
						{(movie?.vote_average / 2).toFixed(1)}
						<Text className="text-slate-400 font-normal">
							/5 ({movie?.vote_count})
						</Text>
					</Text>
				</View>
				<Text className="text-base text-slate-400 font-medium">
					{movie?.release_date?.split("-")[0] ?? "–"}
				</Text>
				<Text className="text-base text-slate-400 font-medium">
					{movie?.runtime} Minutes
				</Text>
			</View>
		</View>
	)
}

function MovieInfo({
	label,
	value,
}: {
	label: string
	value: string | number | null
}) {
	return (
		<View className="flex-col items-start justify-center mt-5 ">
			<Text className="text-slate-400 font-normal text-base">{label}</Text>
			<Text className="text-slate-200 leading-normal">{value || "N/A"}</Text>
		</View>
	)
}
