import { Tabs } from "expo-router"
import colors from "tailwindcss/colors"
import { TabBarItem } from "@/shared/ui/TabBarItem"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export function AppTabs() {
	const insets = useSafeAreaInsets()

	const screens = [
		{ name: "index", title: "Home", icon: "house" },
		{ name: "search", title: "Search", icon: "magnifyingglass" },
		{ name: "profile", title: "Profile", icon: "person" },
		{ name: "saved", title: "Saved", icon: "bookmark" },
	] as const

	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				},
				sceneStyle: { backgroundColor: "transparent" },
				tabBarStyle: {
					backgroundColor: colors.slate[900],
					borderRadius: 50,
					marginBottom: Math.max(36, insets.bottom + 10),
					height: 54,
					position: "absolute",
					overflow: "hidden",
					elevation: 0,
					shadowOpacity: 0,
					borderColor: "transparent",
				},
			}}>
			{screens.map((screen) => (
				<Tabs.Screen
					key={screen.name}
					name={screen.name}
					options={{
						title: screen.title,
						headerShown: false,
						tabBarIcon: ({ focused }) => (
							<TabBarItem
								title={screen.title}
								icon={screen.icon}
								focused={focused}
							/>
						),
					}}
				/>
			))}
		</Tabs>
	)
}
