import { ListHeader } from "@/features/movies/ui/ListHeader"
import { MovieCard } from "@/features/movies/ui/MovieCard"
import { FlatList } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface MovieListProps {
	movies: Movie[]
	loading: boolean
	error: Error | null
}

export function MovieList({ movies, loading, error }: MovieListProps) {
	const insets = useSafeAreaInsets()

	return (
		<FlatList
			data={movies}
			renderItem={({ item }) => <MovieCard movie={item} />}
			ListHeaderComponent={<ListHeader loading={loading} error={error} />}
			keyExtractor={(item) => item.id.toString()}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				paddingBottom: Math.max(140, insets.bottom + 100),
			}}
			numColumns={2}
			columnWrapperClassName="justify-start gap-x-2 gap-y-4 pr-2 mb-2"
			removeClippedSubviews
			maxToRenderPerBatch={10}
			initialNumToRender={10}
			windowSize={10}
		/>
	)
}
