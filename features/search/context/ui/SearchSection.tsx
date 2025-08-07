import { useSearch } from "@/features/search/context/SearchContext"
import { useFocusEffect, useRouter } from "expo-router"
import { SymbolView } from "expo-symbols"
import { useCallback, useRef } from "react"
import { Keyboard, TextInput, View } from "react-native"
import colors from "tailwindcss/colors"

export function SearchSection({
	isSearchPage = false,
}: {
	isSearchPage?: boolean
}) {
	const router = useRouter()
	const { searchTerm, setSearchTerm } = useSearch()
	const inputRef = useRef<TextInput>(null)

	// Focus bei erstmaligem Öffnen der SearchPage
	useFocusEffect(
		useCallback(() => {
			if (isSearchPage) {
				const timer = setTimeout(() => {
					inputRef.current?.focus()
					if (searchTerm) {
						inputRef.current?.setSelection(searchTerm.length, searchTerm.length)
					}
				}, 100)
				return () => clearTimeout(timer)
			}
		}, [isSearchPage, searchTerm])
	)

	const handleSubmit = () => {
		const trimmed = searchTerm.trim()
		setSearchTerm(trimmed)
		inputRef.current?.blur()
		Keyboard.dismiss()

		if (!isSearchPage) {
			router.push("/search")
		}
	}

	const handlePress = () => {
		if (!isSearchPage) {
			router.push("/search")
		}
	}

	return (
		<View className="flex-row items-center bg-slate-900 rounded-full px-5 py-4 w-full">
			<SymbolView
				name="magnifyingglass"
				size={20}
				tintColor={colors.slate[400]}
				weight="medium"
			/>
			<TextInput
				ref={inputRef}
				value={isSearchPage ? searchTerm : ""}
				onChangeText={isSearchPage ? setSearchTerm : undefined}
				onPressIn={handlePress}
				onSubmitEditing={handleSubmit}
				returnKeyType="search"
				editable={isSearchPage}
				className="text-slate-300 font-medium leading-tight text-lg ml-3 flex-1"
				style={{ paddingVertical: 0, textAlignVertical: "center" }}
				placeholderTextColor={colors.slate[400]}
				placeholder="Search for a movie"
				cursorColor={colors.yellow[500]}
				selectionColor={colors.yellow[500]}
			/>
		</View>
	)
}
