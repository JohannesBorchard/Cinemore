import { MovieCard } from "@/features/movies/ui/MovieCard"
import { FlatList, Text } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface MovieListProps {
	title?: string
	movies: Movie[]
	loading: boolean
	error: Error | null
	ListHeaderComponent?: React.ReactElement
}

export function MovieList({
	title = "Latest Movies",
	movies,
	loading,
	error,
	ListHeaderComponent,
}: MovieListProps) {
	const insets = useSafeAreaInsets()

	return (
		<FlatList
			data={movies}
			renderItem={({ item }) => <MovieCard movie={item} />}
			ListHeaderComponent={
				<>
					{ListHeaderComponent}
					<Text className="text-2xl text-white font-bold mt-5 pb-5">
						{title}
					</Text>
				</>
			}
			keyExtractor={(item) => item.id.toString()}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				paddingBottom: Math.max(140, insets.bottom + 100),
				paddingTop: insets.top + 65,
			}}
			numColumns={2}
			columnWrapperClassName="justify-start gap-x-2 gap-y-4 pr-2 mb-2 "
			removeClippedSubviews
			maxToRenderPerBatch={10}
			initialNumToRender={10}
			windowSize={10}
		/>
	)
}
