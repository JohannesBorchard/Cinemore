import { TabBarItem } from "@/shared/ui/navigation/TabBarItem"
import { Tabs } from "expo-router"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import colors from "tailwindcss/colors"

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
					paddingHorizontal: 20, // breiterer Klickbereich
					minWidth: 90, // breiter als nur Icon,
					marginTop: 8,
				},
				sceneStyle: { backgroundColor: "transparent" },
				tabBarStyle: {
					backgroundColor: colors.slate[900],
					borderRadius: 50,
					marginBottom: Math.max(36, insets.bottom + 10),
					height: 55,
					position: "absolute",
					overflow: "hidden",
					elevation: 0,
					shadowOpacity: 0,
					borderColor: "transparent",
					alignItems: "center",
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
