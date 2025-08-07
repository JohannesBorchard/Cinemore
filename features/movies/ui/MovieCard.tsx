import { Href, Link } from "expo-router"
import { SymbolView } from "expo-symbols"
import { memo } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import colors from "tailwindcss/colors"

export const MovieCard = memo(function MovieCard({ movie }: { movie: Movie }) {
	return (
		<Link href={`/movies/${movie.id}` as Href} asChild>
			<TouchableOpacity className="flex-1 mx-1 mb-4">
				<Image
					source={{
						uri: movie.poster_path
							? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
							: "https://placehold.co/600x400/1a1a1a/ffffff.png",
					}}
					className="w-full h-64 rounded-lg"
					resizeMode="cover"
				/>
				<Text
					className="text-base font-bold text-slate-200 mt-2"
					numberOfLines={1}>
					{movie.title}
				</Text>
				<View className="flex-row justify-between">
					<View className="flex-row items-center justify-start gap-x-1">
						<SymbolView
							name="star.fill"
							tintColor={colors.yellow[500]}
							size={16}
						/>
						<Text className="text-slate-200 text-xs font-bold uppercase w-fu">
							{Math.round(movie.vote_average / 2)}
						</Text>
					</View>
					<Text className="text-xs text-slate-400 font-medium mt-1">
						{movie.release_date?.split("-")[0] ?? "–"}
					</Text>
				</View>
			</TouchableOpacity>
		</Link>
	)
})
