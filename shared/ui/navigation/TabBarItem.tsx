import { cn } from "@/shared/lib/utils"
import { SymbolView, type SFSymbol } from "expo-symbols"
import { Text, View } from "react-native"
import colors from "tailwindcss/colors"

export function TabBarItem({
	title,
	icon,
	focused,
}: {
	title: string
	icon: SFSymbol
	focused: boolean
}) {
	return (
		<View
			className={cn(
				"flex-row items-center justify-center py-5  -ml-0.5 px-5 rounded-full min-w-[90px]",
				focused ? "bg-yellow-400" : "bg-transparent"
			)}>
			<SymbolView
				name={icon}
				size={20}
				tintColor={focused ? colors.yellow[950] : colors.yellow[300]}
				weight="medium"
			/>
			{focused && (
				<Text
					className="ml-1 text-gray-950 text-sm font-semibold"
					numberOfLines={1}>
					{title}
				</Text>
			)}
		</View>
	)
}
