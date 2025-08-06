import { SearchSection } from "@/features/movies/ui/SearchSection"
import { LoadingErrorState } from "@/shared/ui/LoadingErrorState"
import { memo } from "react"
import { View } from "react-native"

export const ListHeader = memo(function ListHeader({
	loading,
	error,
	topInset,
}: {
	loading: boolean
	error: Error | null
	topInset: number
}) {
	return (
		<View className="pb-5" style={{ paddingTop: topInset + 100 }}>
			<LoadingErrorState loading={loading} error={error} />
			{!loading && !error && <SearchSection />}
		</View>
	)
})
