import { cn } from "@/shared/lib/utils"
import { SymbolView, type SFSymbol } from "expo-symbols"
import { Text, View } from "react-native"
import colors from "tailwindcss/colors"

export function TabBarItem({
	title,
	icon,
	focused,
	disabled = false,
}: {
	title: string
	icon: SFSymbol
	focused: boolean
	disabled?: boolean
}) {
	return (
		<View
			className={cn(
				"flex-row items-center justify-center py-5 -ml-0.5 px-5 rounded-full min-w-[90px]",
				focused && !disabled ? "bg-yellow-400" : "bg-transparent",
				disabled && "opacity-50" // ← 50% Opacity für disabled
			)}
			pointerEvents={disabled ? "none" : "auto"} // ← Interaktion deaktivieren
		>
			<SymbolView
				name={icon}
				size={20}
				tintColor={
					focused && !disabled
						? colors.yellow[950]
						: disabled
							? colors.slate[500] // ← Grau für disabled
							: colors.yellow[300]
				}
				weight="medium"
			/>
			{focused && !disabled && (
				<Text
					className="ml-1 text-slate-950 text-sm font-semibold"
					numberOfLines={1}>
					{title}
				</Text>
			)}
		</View>
	)
}
