import SearchBar from "@/shared/ui/forms/SearchBar"
import { LoadingErrorState } from "@/shared/ui/LoadingErrorState"
import { useRouter } from "expo-router"
import { memo } from "react"
import { Text, View } from "react-native"

export const ListHeader = memo(function ListHeader({
	title = "Latest Movies",
	loading,
	error,
	topInset = 0,
}: {
	title?: string
	loading: boolean
	error: Error | null
	topInset?: number
}) {
	const router = useRouter()

	return (
		<View className="pb-5 pt-32">
			<LoadingErrorState loading={loading} error={error} />
			{!loading && !error && (
				<>
					<SearchBar
						onPress={() => router.push("/search")}
						placeholder="Search for a movie"
					/>
					<Text className="text-2xl text-white font-bold mt-5">{title}</Text>
				</>
			)}
		</View>
	)
})
