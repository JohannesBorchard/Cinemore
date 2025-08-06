import { images } from "@/constants/images"
import { cn } from "@/shared/lib/utils"
import { AppLogo } from "@/shared/ui/AppLogo"
import { Tabs } from "expo-router"
import { SymbolView, type SFSymbol } from "expo-symbols"
import React from "react"
import { Image, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import colors from "tailwindcss/colors"

function TabBarItem({
	title,
	icon,
	focused,
}: {
	title: string
	icon: SFSymbol
	focused: boolean
}) {
	return (
		<View
			className={cn(
				"flex-row items-center justify-center py-5 mt-4 -ml-0.5 px-5 rounded-full min-w-[90px]",
				focused ? "bg-purple-400" : "bg-transparent"
			)}>
			<SymbolView
				name={icon}
				size={20}
				tintColor={focused ? colors.purple[950] : colors.purple[300]}
				weight="medium"
			/>
			{focused && (
				<Text
					className="ml-1 text-gray-950 text-sm font-semibold"
					numberOfLines={1}>
					{title}
				</Text>
			)}
		</View>
	)
}

const TabsLayout = () => {
	const insets = useSafeAreaInsets()

	return (
		<View className="flex-1 bg-slate-950">
			{/* Globaler Hintergrund */}
			<Image
				source={images.bg}
				className="absolute w-full h-full z-0"
				resizeMode="cover"
				fadeDuration={0}
			/>

			{/* Globales AppLogo - fix positioniert mit Top Safe Area */}
			<View className="absolute w-full z-10" style={{ top: insets.top + 20 }}>
				<View className="items-center">
					<AppLogo />
				</View>
			</View>

			{/* Wrapper mit globalem horizontalen Padding */}
			<View className="flex-1 px-5">
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
					<Tabs.Screen
						name="index"
						options={{
							title: "Home",
							headerShown: false,
							tabBarIcon: ({ focused }) => (
								<TabBarItem title="Home" icon="house" focused={focused} />
							),
						}}
					/>
					<Tabs.Screen
						name="search"
						options={{
							title: "Search",
							headerShown: false,
							tabBarIcon: ({ focused }) => (
								<TabBarItem
									title="Search"
									icon="magnifyingglass"
									focused={focused}
								/>
							),
						}}
					/>
					<Tabs.Screen
						name="profile"
						options={{
							title: "Profile",
							headerShown: false,
							tabBarIcon: ({ focused }) => (
								<TabBarItem title="Profile" icon="person" focused={focused} />
							),
						}}
					/>
					<Tabs.Screen
						name="saved"
						options={{
							title: "Saved",
							headerShown: false,
							tabBarIcon: ({ focused }) => (
								<TabBarItem title="Saved" icon="bookmark" focused={focused} />
							),
						}}
					/>
				</Tabs>
			</View>
		</View>
	)
}

export default TabsLayout
