import { SymbolView } from "expo-symbols"
import { Text, View } from "react-native"
import colors from "tailwindcss/colors"

export function AppLogo() {
	return (
		<View className="flex-row items-center gap-2 w-fit justify-center leading-none mb-5">
			<SymbolView
				name="film"
				size={45}
				tintColor={colors.purple[400]}
				weight="medium"
			/>
			<Text className="text-purple-300 font-bold text-4xl">Cinemore</Text>
		</View>
	)
}
