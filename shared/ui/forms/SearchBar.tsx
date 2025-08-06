import { SymbolView } from "expo-symbols"
import React from "react"
import { TextInput, View } from "react-native"
import colors from "tailwindcss/colors"

function SearchBar({
	onPress,
	placeholder,
}: {
	onPress?: () => void
	placeholder: string
}) {
	return (
		<View className="flex-row items-center bg-slate-900 rounded-full px-5 py-4 w-full">
			<SymbolView
				name="magnifyingglass"
				size={20}
				tintColor={colors.slate[500]}
				weight="medium"
			/>
			<TextInput
				/* onPress={onPress} */
				className="text-slate-300 font-medium text-lg ml-3 flex-1  leading-tight"
				placeholderTextColor={colors.slate[500]}
				placeholder={placeholder}
				cursorColor={colors.purple[500]}
				selectionColor={colors.purple[500]}
			/>
		</View>
	)
}

export default SearchBar
