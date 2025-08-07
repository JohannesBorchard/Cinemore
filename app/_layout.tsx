import { SearchProvider } from "@/features/search/context/SearchContext"
import { Stack } from "expo-router"
import React from "react"
import { View } from "react-native"
import "../global.css"

export default function RootLayout() {
	return (
		<SearchProvider>
			<View className="flex-1 bg-slate-950">
				{/* <AppHeader /> */}

				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
				</Stack>
			</View>
		</SearchProvider>
	)
}
