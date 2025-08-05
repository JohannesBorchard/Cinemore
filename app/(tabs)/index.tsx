import { Link } from "expo-router"
import { Text, View } from "react-native"

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
			className="bg-slate-950">
			<Text className="text-accent font-medium text-3xl">Welcome!</Text>
			<Text className="text-primary text-5xl font-bold">Welcome!</Text>
			<Link href="/onboarding">Onboarding</Link>
			<Link href="/movies/avengers">Avengers</Link>
		</View>
	)
}
