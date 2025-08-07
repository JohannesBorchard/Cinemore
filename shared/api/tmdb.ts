export const TMDB_CONFIG = {
	BASE_URL: "https://api.themoviedb.org/3",
	API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
}

export async function fetchMovies({
	query,
}: {
	query?: string
}): Promise<Movie[]> {
	const endpoint = query
		? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${TMDB_CONFIG.API_KEY}`
		: `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${TMDB_CONFIG.API_KEY}`

	const response = await fetch(endpoint, {
		method: "GET",
		headers: {
			accept: "application/json",
		},
	})

	if (!response.ok) {
		const errorText = await response.text()
		console.error("❌ API Error:", response.status, errorText)
		throw new Error(
			`Failed to fetch movies: ${response.status} ${response.statusText}`
		)
	}

	const data = await response.json()
	return data.results
}

export async function fetchMovieDetails(
	movieId: string
): Promise<MovieDetails> {
	try {
		const response = await fetch(
			`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
			{
				method: "GET",
				headers: {
					accept: "application/json",
				},
			}
		)

		if (!response.ok) throw new Error("Failed to fetch movie details")

		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
		throw error
	}
}
