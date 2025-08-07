import { MovieMeta } from "@/features/movies/ui/MovieMeta"
import { Href, Link } from "expo-router"
import { memo } from "react"
import { Image, Keyboard, Text, TouchableOpacity } from "react-native"

export const MovieCard = memo(function MovieCard({ movie }: { movie: Movie }) {
	const handlePress = () => {
		Keyboard.dismiss()
	}

	return (
		<Link href={`/movies/${movie.id}` as Href} asChild>
			<TouchableOpacity className="flex-1 mx-1 mb-4" onPress={handlePress}>
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
				<MovieMeta movie={movie} />
			</TouchableOpacity>
		</Link>
	)
})
