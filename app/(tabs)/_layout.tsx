import { cn } from "@/shared/lib/utils"
import { Tabs } from "expo-router"
import { SymbolView, type SFSymbol } from "expo-symbols"
import React from "react"
import { Text, View } from "react-native"
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
				"flex-row items-center justify-center py-5 mt-4 -ml-0.5 px-5 rounded-full min-w-[90px] ",
				focused ? "bg-purple-400" : "bg-transparent"
			)}>
			<SymbolView
				name={icon}
				size={20}
				tintColor={focused ? colors.purple[950] : colors.purple[300]}
				weight="medium"
			/>
			{focused && (
				<Text className="ml-1 text-gray-950 text-sm" numberOfLines={1}>
					{title}
				</Text>
			)}
		</View>
	)
}

const TabsLayout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				},
				tabBarStyle: {
					paddingHorizontal: 0,
					backgroundColor: "#0f0D23",
					borderRadius: 50,
					marginHorizontal: 10,
					marginBottom: 36,
					height: 54,
					position: "absolute",
					overflow: "hidden",
					elevation: 0,
					shadowOpacity: 0,
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
	)
}

export default TabsLayout
