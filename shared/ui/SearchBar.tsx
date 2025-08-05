import { SymbolView } from "expo-symbols"
import React from "react"
import { Text, View } from "react-native"
import colors from "tailwindcss/colors"

const SearchBar = () => {
	return (
		<View className="flex-row items-center bg-slate-900 rounded-full px-5 py-4 w-full">
			<SymbolView
				name="magnifyingglass"
				size={20}
				tintColor={colors.slate[500]}
				weight="medium"
			/>
			<Text className="text-slate-400 font-medium text-base ml-4">Search</Text>
		</View>
	)
}

export default SearchBar
