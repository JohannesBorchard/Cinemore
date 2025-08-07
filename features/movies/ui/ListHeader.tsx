import { LoadingErrorState } from "@/shared/ui/LoadingErrorState"
import React, { memo } from "react"
import { View } from "react-native"

export const ListHeader = memo(function ListHeader({
	loading,
	error,
}: {
	loading: boolean
	error: Error | null
}) {
	return (
		<View className="pb-5 pt-5">
			<LoadingErrorState loading={loading} error={error} />
		</View>
	)
})
