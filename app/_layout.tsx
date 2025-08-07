import { SearchProvider } from "@/features/search/context/SearchContext"
import { Stack } from "expo-router"
import React from "react"
import "../global.css"

export default function RootLayout() {
	return (
		<SearchProvider>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
			</Stack>
		</SearchProvider>
	)
}
