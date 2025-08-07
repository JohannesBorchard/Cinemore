import { memo } from "react"
import { ActivityIndicator, Text } from "react-native"
import colors from "tailwindcss/colors"

export const LoadingErrorState = memo(function LoadingErrorState({
	loading,
	error,
}: {
	loading: boolean
	error: Error | null
}) {
	if (loading) {
		return (
			<ActivityIndicator
				size="large"
				color={colors.yellow[500]}
				className="mt-10 self-center"
			/>
		)
	}

	if (error) {
		return <Text className="text-red-500">Error: {error?.message}</Text>
	}

	return null
})
