import { Href, Link } from "expo-router"
import { memo } from "react"
import { Image, Text, TouchableOpacity } from "react-native"

export const MovieCard = memo(function MovieCard({ movie }: { movie: Movie }) {
	return (
		<Link href={`/movie/${movie.id}` as Href} asChild>
			<TouchableOpacity className="flex-1 mx-1">
				<Image
					source={{
						uri: movie.poster_path
							? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
							: "https://placehold.co/600x400/1a1a1a/ffffff.png",
					}}
					className="w-full h-52 rounded-lg"
					resizeMode="cover"
				/>
				<Text className="text-sm font-bold text-slate-200 mt-2 mb-4">
					{movie.title}
				</Text>
			</TouchableOpacity>
		</Link>
	)
})
