import { MovieCard } from "@/features/movies/ui/MovieCard"
import { SearchSection } from "@/features/search/context/ui/SearchSection"
import { forwardRef, useImperativeHandle, useRef } from "react"
import { FlatList, Text } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface MovieListProps {
	title?: string
	movies: Movie[]
	loading: boolean
	error: Error | null
	isSearchPage?: boolean
}

export type MovieListRef = {
	scrollToTop: () => void
}

export const MovieList = forwardRef<MovieListRef, MovieListProps>(
	(
		{ title = "Latest Movies", movies, loading, error, isSearchPage = false },
		ref
	) => {
		const insets = useSafeAreaInsets()
		const flatListRef = useRef<FlatList>(null)

		// expose scrollToTop()
		useImperativeHandle(ref, () => ({
			scrollToTop() {
				flatListRef.current?.scrollToOffset({ offset: 0, animated: false })
			},
		}))

		return (
			<FlatList
				ref={flatListRef}
				data={movies}
				renderItem={({ item }: { item: Movie }) =>
					item ? <MovieCard movie={item} /> : null
				}
				ListHeaderComponent={
					<>
						<SearchSection isSearchPage={isSearchPage} />
						<Text className="text-2xl text-white font-bold mt-5 pb-5">
							{title}
						</Text>
					</>
				}
				keyExtractor={(item) => item.id.toString()}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingTop: insets.top + 80,
					paddingBottom: Math.max(140, insets.bottom + 100),
				}}
				numColumns={2}
				columnWrapperClassName="justify-start gap-x-2 gap-y-4 pr-2 mb-2"
				removeClippedSubviews
				maxToRenderPerBatch={10}
				initialNumToRender={10}
				windowSize={10}
				ListEmptyComponent={
					<Text className="text-slate-400 text-left text-lg mt-1">
						No results found.
					</Text>
				}
			/>
		)
	}
)

MovieList.displayName = "MovieList"
