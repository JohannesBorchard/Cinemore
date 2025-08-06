import { images } from "@/constants/images"
import { fetchMovies } from "@/shared/api/tmdb"
import { useFetch } from "@/shared/model/useFetch"
import SearchBar from "@/shared/ui/SearchBar"
import { useRouter } from "expo-router"
import { SymbolView } from "expo-symbols"
import { useCallback } from "react"
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native"
import colors from "tailwindcss/colors"

export default function Index() {
	const router = useRouter()

	const fetchMoviesCallback = useCallback(() => fetchMovies({ query: "" }), [])

	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
	} = useFetch(fetchMoviesCallback)

	const renderHeader = () => (
		<View className="pt-20 pb-5">
			<View className="flex-row items-center gap-2 w-fit justify-center leading-none mb-5">
				<SymbolView
					name="film"
					size={45}
					tintColor={colors.purple[400]}
					weight="medium"
				/>
				<Text className="text-purple-300 font-bold text-4xl">Cinemore</Text>
			</View>

			{moviesLoading ? (
				<ActivityIndicator
					size="large"
					color={colors.purple[500]}
					className="mt-10 self-center"
				/>
			) : moviesError ? (
				<Text className="text-red-500">Error: {moviesError?.message}</Text>
			) : (
				<>
					<SearchBar
						onPress={() => router.push("/search")}
						placeholder="Search for a movie"
					/>
					<Text className="text-2xl text-white font-bold mt-5">
						Latest Movies
					</Text>
				</>
			)}
		</View>
	)

	interface Movie {
		id: number
		title: string
		overview?: string
		poster_path?: string
		backdrop_path?: string
		release_date?: string
		vote_average?: number
		genre_ids?: number[]
	}

	const renderMovieItem = ({ item }: { item: Movie }) => (
		<View>
			<Text className="text-slate-400 text-base">{item.title}</Text>
		</View>
	)

	return (
		<View className="bg-slate-950 flex-1">
			<Image source={images.bg} className="absolute w-full z-0" />
			<FlatList
				data={movies || []}
				renderItem={renderMovieItem}
				ListHeaderComponent={renderHeader}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 40 }}
				keyExtractor={(item) => item.id.toString()}
				numColumns={3}
				columnWrapperClassName="justify-start gap-2 pr-2 mb-2 flex-wrap"
				className="pb-32 px-5"
				/* scrollEnabled={false} */
			/>
		</View>
	)
}
