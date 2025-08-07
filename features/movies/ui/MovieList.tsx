import { MovieCard } from "@/features/movies/ui/MovieCard"
import { SearchSection } from "@/features/search/context/ui/SearchSection"
import { forwardRef, useImperativeHandle, useRef } from "react"
import { FlatList, Text } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface MovieListProps {
	searchTerm?: string
	movies: Movie[]
	loading: boolean
	error: Error | null
	isSearchPage?: boolean
}

export type MovieListRef = {
	scrollToTop: () => void
}

export const MovieList = forwardRef<MovieListRef, MovieListProps>(
	({ searchTerm, movies, loading, error, isSearchPage = false }, ref) => {
		const insets = useSafeAreaInsets()
		const flatListRef = useRef<FlatList>(null)

		const title = isSearchPage
			? searchTerm
				? `Search for '${searchTerm}'`
				: "Search Movies"
			: "Latest Movies"

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
						{isSearchPage ? (
							searchTerm ? (
								<Text className="text-2xl font-bold mt-5 pb-5">
									<Text className="text-white">Search for </Text>
									<Text className="text-yellow-500">{`'${searchTerm}'`}</Text>
								</Text>
							) : (
								<Text className="text-2xl text-white font-bold mt-5 pb-5">
									Search Movies
								</Text>
							)
						) : (
							<Text className="text-2xl text-white font-bold mt-5 pb-5">
								Latest Movies
							</Text>
						)}
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
