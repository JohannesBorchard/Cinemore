import { useMovies } from "@/features/movies/model/useMovies"
import { MovieList, MovieListRef } from "@/features/movies/ui/MovieList"
import { useSearch } from "@/features/search/context/SearchContext"
import { useFocusEffect } from "expo-router"
import { useRef } from "react"

export default function Search() {
	const listRef = useRef<MovieListRef>(null)
	const { searchTerm } = useSearch()
	const { movies, loading, error } = useMovies(searchTerm)

	useFocusEffect(() => {
		listRef.current?.scrollToTop()
	})

	return (
		<MovieList
			ref={listRef}
			movies={movies}
			loading={loading}
			error={error}
			isSearchPage
			searchTerm={searchTerm}
		/>
	)
}
