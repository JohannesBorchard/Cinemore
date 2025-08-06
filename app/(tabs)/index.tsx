import { useMovies } from "@/features/movies/model/useMovies"
import { ListHeader } from "@/features/movies/ui/ListHeader"
import { MovieItem } from "@/features/movies/ui/MovieItem"
import React, { useCallback, useMemo } from "react"
import { FlatList, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function Index() {
	const insets = useSafeAreaInsets()
	const { movies, loading, error } = useMovies()

	const headerComponent = useMemo(
		() => <ListHeader loading={loading} error={error} topInset={insets.top} />,
		[loading, error, insets.top]
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
				paddingBottom: Math.max(140, insets.bottom + 100),
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
				data={movies}
				renderItem={renderMovieItem}
				ListHeaderComponent={headerComponent}
				keyExtractor={keyExtractor}
				{...flatListProps}
			/>
		</View>
	)
}
