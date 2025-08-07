import { TabBarItem } from "@/shared/ui/navigation/TabBarItem"
import { BlurView } from "expo-blur"
import * as Haptics from "expo-haptics"
import { Tabs } from "expo-router"
import { Platform } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export function AppTabs() {
	const insets = useSafeAreaInsets()

	const screens = [
		{ name: "index", title: "Home", icon: "house", enabled: true },
		{ name: "search", title: "Search", icon: "magnifyingglass", enabled: true },
		{ name: "profile", title: "Profile", icon: "person", enabled: false },
		{ name: "saved", title: "Saved", icon: "bookmark", enabled: false },
	] as const

	const handleTabPress = () => {
		// Haptic Feedback nur auf iOS
		if (Platform.OS === "ios") {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
		}
	}

	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					paddingHorizontal: 20,
					minWidth: 90,
					marginTop: 8,
				},
				sceneStyle: { backgroundColor: "transparent" },
				animation: "fade", // oder "fade"
				tabBarStyle: {
					backgroundColor: "transparent",
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
				tabBarBackground: () => (
					<BlurView
						intensity={80}
						tint="dark"
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							borderRadius: 50,
							overflow: "hidden",
						}}
					/>
				),
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
								disabled={!screen.enabled} // ← Neuer Prop
							/>
						),
					}}
					listeners={{
						tabPress: screen.enabled
							? handleTabPress
							: (e) => {
									e.preventDefault() // Verhindert Navigation
									// Optional: Haptic für "disabled" Feedback
									if (Platform.OS === "ios") {
										Haptics.notificationAsync(
											Haptics.NotificationFeedbackType.Warning
										)
									}
								},
					}}
				/>
			))}
		</Tabs>
	)
}
