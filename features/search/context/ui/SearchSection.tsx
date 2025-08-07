import { useSearch } from "@/features/search/context/SearchContext"
import { useFocusEffect, useRouter } from "expo-router"
import { SymbolView } from "expo-symbols"
import { useCallback, useEffect, useRef, useState } from "react"
import { TextInput, View } from "react-native"
import colors from "tailwindcss/colors"

export function SearchSection({
	isSearchPage = false,
}: {
	isSearchPage?: boolean
}) {
	const router = useRouter()
	const { searchTerm, setSearchTerm } = useSearch()
	const [inputValue, setInputValue] = useState(searchTerm)
	const inputRef = useRef<TextInput>(null)

	// Sync input with context when searchTerm changes
	useEffect(() => {
		setInputValue(searchTerm)
	}, [searchTerm])

	// Focus input when search page becomes active
	useFocusEffect(
		useCallback(() => {
			if (isSearchPage && !searchTerm) {
				const timer = setTimeout(() => {
					inputRef.current?.focus()
				}, 100)

				return () => clearTimeout(timer)
			}
		}, [isSearchPage, searchTerm])
	)

	const handleSubmit = () => {
		const trimmedValue = inputValue.trim()
		setSearchTerm(trimmedValue)

		if (!isSearchPage) {
			router.push("/search")
		}
	}

	const handlePress = () => {
		if (!isSearchPage) {
			router.push("/search")
		}
	}

	const handleTextChange = (text: string) => {
		if (isSearchPage) {
			setInputValue(text)
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
				value={isSearchPage ? inputValue : ""}
				onChangeText={handleTextChange}
				onPressIn={handlePress}
				onSubmitEditing={handleSubmit}
				returnKeyType="search"
				editable={isSearchPage}
				className="text-slate-300 font-medium leading-tight text-lg ml-3 flex-1"
				style={{
					paddingVertical: 0,
					textAlignVertical: "center",
				}}
				placeholderTextColor={colors.slate[400]}
				placeholder="Search for a movie"
				cursorColor={colors.yellow[500]}
				selectionColor={colors.yellow[500]}
			/>
		</View>
	)
}
