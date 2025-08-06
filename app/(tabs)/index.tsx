import { images } from "@/constants/images"
import { fetchMovies } from "@/shared/api/tmdb"
import { useFetch } from "@/shared/model/useFetch"
import SearchBar from "@/shared/ui/SearchBar"
import { useRouter } from "expo-router"
import { SymbolView } from "expo-symbols"
import { memo, useCallback, useMemo } from "react"
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native"
import colors from "tailwindcss/colors"

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

function AppLogo() {
	return (
		<View className="flex-row items-center gap-2 w-fit justify-center leading-none mb-5">
			<SymbolView
				name="film"
				size={45}
				tintColor={colors.purple[400]}
				weight="medium"
			/>
			<Text className="text-purple-300 font-bold text-4xl">Cinemore</Text>
		</View>
	)
}

function SearchSection() {
	const router = useRouter()

	return (
		<>
			<SearchBar
				onPress={() => router.push("/search")}
				placeholder="Search for a movie"
			/>
			<Text className="text-2xl text-white font-bold mt-5">Latest Movies</Text>
		</>
	)
}

// Props ändern sich häufig - memo sinnvoll
const LoadingErrorState = memo(function LoadingErrorState({
	loading,
	error,
}: {
	loading: boolean
	error: Error | null
}) {
	if (loading) {
		return (
			<ActivityIndicator
				size="large"
				color={colors.purple[500]}
				className="mt-10 self-center"
			/>
		)
	}

	if (error) {
		return <Text className="text-red-500">Error: {error?.message}</Text>
	}

	return null
})

// FlatList Item - memo sehr wichtig für Performance
const MovieItem = memo(function MovieItem({ item }: { item: Movie }) {
	return (
		<View>
			<Text className="text-slate-400 text-base">{item.title}</Text>
		</View>
	)
})

// Header Komponente - Props ändern sich selten, memo sinnvoll
const ListHeader = memo(function ListHeader({
	loading,
	error,
}: {
	loading: boolean
	error: Error | null
}) {
	return (
		<View className="pt-20 pb-5">
			<AppLogo />
			<LoadingErrorState loading={loading} error={error} />
			{!loading && !error && <SearchSection />}
		</View>
	)
})

export default function Index() {
	const fetchMoviesCallback = useCallback(() => fetchMovies({ query: "" }), [])

	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
	} = useFetch(fetchMoviesCallback)

	const headerComponent = useMemo(
		() => <ListHeader loading={moviesLoading} error={moviesError} />,
		[moviesLoading, moviesError]
	)

	const renderMovieItem = useCallback(
		({ item }: { item: Movie }) => <MovieItem item={item} />,
		[]
	)

	const keyExtractor = useCallback((item: Movie) => item.id.toString(), [])

	const flatListProps = useMemo(
		() => ({
			showsVerticalScrollIndicator: false,
			contentContainerStyle: { paddingBottom: 40 },
			numColumns: 3 as const,
			columnWrapperClassName: "justify-start gap-2 pr-2 mb-2 flex-wrap",
			className: "pb-32 px-5",
			removeClippedSubviews: true,
			maxToRenderPerBatch: 10,
			initialNumToRender: 10,
			windowSize: 10,
		}),
		[]
	)

	return (
		<View className="bg-slate-950 flex-1">
			<Image source={images.bg} className="absolute w-full z-0" />
			<FlatList
				data={movies || []}
				renderItem={renderMovieItem}
				ListHeaderComponent={headerComponent}
				keyExtractor={keyExtractor}
				{...flatListProps}
			/>
		</View>
	)
}
