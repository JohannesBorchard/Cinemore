import { SearchSection } from "@/features/search/context/ui/SearchSection"
import { LoadingErrorState } from "@/shared/ui/LoadingErrorState"
import React, { memo } from "react"
import { Text, View } from "react-native"

export const ListHeader = memo(function ListHeader({
	title,
	loading,
	error,
	isSearchPage = false,
}: {
	title: string
	loading: boolean
	error: Error | null
	isSearchPage?: boolean
}) {
	return (
		<View className="pb-5 pt-5">
			<LoadingErrorState loading={loading} error={error} />
			{!loading && !error && (
				<>
					<SearchSection isSearchPage={isSearchPage} />
					<Text className="text-2xl text-white font-bold mt-5">{title}</Text>
				</>
			)}
		</View>
	)
})
