import { Text, View } from "react-native"

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}>
			<Text className="text-accent font-medium text-3xl">Welcome!</Text>
			<Text className="text-primary text-5xl font-bold">Welcome!</Text>
		</View>
	)
}
