import { Movie } from "@/interfaces/interfaces"
import { fetchMovies } from "@/shared/api/tmdb"
import { useFetch } from "@/shared/model/useFetch"
import { ListHeader } from "@/shared/ui/ListHeader"
import { MovieItem } from "@/shared/ui/MovieItem"
import React, { useCallback, useMemo } from "react"
import { FlatList, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

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
