import { SymbolView } from "expo-symbols"
import { Text, View } from "react-native"
import colors from "tailwindcss/colors"

export function MovieMeta({ movie }: { movie: Movie }) {
	return (
		<View className="flex-row justify-between">
			<View className="flex-row items-center justify-start gap-x-1">
				<SymbolView name="star.fill" tintColor={colors.yellow[500]} size={16} />
				<Text className="text-slate-200 text-xs font-bold uppercase w-fu">
					{Math.round(movie.vote_average / 2)}
				</Text>
			</View>
			<Text className="text-xs text-slate-400 font-medium mt-1">
				{movie.release_date?.split("-")[0] ?? "–"}
			</Text>
		</View>
	)
}
