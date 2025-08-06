import SearchBar from "@/shared/ui/forms/SearchBar"
import { useRouter } from "expo-router"
import { Text } from "react-native"

export function SearchSection() {
	const router = useRouter()

	return (
		<>
			<SearchBar
				onPress={() => router.push("/search")}
				placeholder="Search for a movie"
			/>
			<Text className="text-2xl text-white font-bold mt-5">Latest Movies</Text>
		</>
	)
}
