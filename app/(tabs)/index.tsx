import { images } from "@/constants/images"
import SearchBar from "@/shared/ui/SearchBar"
import { useRouter } from "expo-router"
import { SymbolView } from "expo-symbols"
import { Image, ScrollView, Text, View } from "react-native"
import colors from "tailwindcss/colors"

export default function Index() {
	const router = useRouter()

	return (
		<View className="bg-slate-950 flex-1 items-center">
			<Image source={images.bg} className="absolute w-full z-0" />
			<ScrollView
				className="flex-1 px-5 min-h-full pb-10 pt-20 w-full"
				showsVerticalScrollIndicator={false}>
				<View className="flex-row items-center gap-2 w-fit justify-center leading-none mb-5">
					<SymbolView
						name="film"
						size={45}
						tintColor={colors.purple[400]}
						weight="medium"
						/* style={{ marginHorizontal: "auto", marginBottom: 10 }} */
					/>
					{/* <Image source={icons.logo} className="w-12 h-10 mx-auto mb-5 mt-20" /> */}
					<Text className="text-purple-300 font-bold text-4xl">Cinemore</Text>
				</View>
				<SearchBar
					onPress={() => router.push("/search")}
					placeholder="Search for a movie"
				/>
			</ScrollView>
		</View>
	)
}
