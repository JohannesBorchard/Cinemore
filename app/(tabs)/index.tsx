import { fetchMovies } from "@/shared/api/tmdb"
import { useFetch } from "@/shared/model/useFetch"
import SearchBar from "@/shared/ui/SearchBar"
import { useRouter } from "expo-router"
import React, { memo, useCallback, useMemo } from "react"
import { ActivityIndicator, FlatList, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
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

// Header Komponente - ohne AppLogo, angepasstes Padding
const ListHeader = memo(function ListHeader({
	loading,
	error,
	topInset,
}: {
	loading: boolean
	error: Error | null
	topInset: number
}) {
	return (
		<View
			className="pb-5"
			style={{ paddingTop: topInset + 100 }} // Platz für globales AppLogo
		>
			<LoadingErrorState loading={loading} error={error} />
			{!loading && !error && <SearchSection />}
		</View>
	)
})

export default function Index() {
	const insets = useSafeAreaInsets()
	const fetchMoviesCallback = useCallback(() => fetchMovies({ query: "" }), [])

	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
	} = useFetch(fetchMoviesCallback)

	const headerComponent = useMemo(
		() => (
			<ListHeader
				loading={moviesLoading}
				error={moviesError}
				topInset={insets.top}
			/>
		),
		[moviesLoading, moviesError, insets.top]
	)

	const renderMovieItem = useCallback(
		({ item }: { item: Movie }) => <MovieItem item={item} />,
		[]
	)

	const keyExtractor = useCallback((item: Movie) => item.id.toString(), [])

	const flatListProps = useMemo(
		() => ({
			showsVerticalScrollIndicator: false,
			contentContainerStyle: {
				paddingBottom: Math.max(140, insets.bottom + 100), // Platz für TabBar
			},
			numColumns: 3 as const,
			columnWrapperClassName: "justify-start gap-2 pr-2 mb-2 flex-wrap",
			removeClippedSubviews: true,
			maxToRenderPerBatch: 10,
			initialNumToRender: 10,
			windowSize: 10,
		}),
		[insets.bottom]
	)

	return (
		<View className="flex-1">
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
