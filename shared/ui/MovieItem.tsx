import { Movie } from "@/interfaces/interfaces"
import { memo } from "react"
import { Text, View } from "react-native"

export const MovieItem = memo(function MovieItem({ item }: { item: Movie }) {
	return (
		<View>
			<Text className="text-slate-400 text-base">{item.title}</Text>
		</View>
	)
})
