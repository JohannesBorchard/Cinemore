import { cn } from "@/shared/lib/utils"
import { Tabs } from "expo-router"
import { SymbolView, type SFSymbol } from "expo-symbols"
import React from "react"
import { Text, View } from "react-native"

function TabBarIcon({
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
				"flex flex-row items-center p-2 rounded-full mt-6",
				focused && "bg-purple-400"
			)}
			style={{ minWidth: 80 }}>
			<SymbolView
				name={icon ? icon : "house.fill"}
				size={20}
				tintColor={focused ? "white" : "black"}
				weight="medium"
			/>
			<Text className={cn("ml-1", focused ? "text-white" : "text-black")}>
				{title ? title : "Home"}
			</Text>
		</View>
	)
}

const TabsLayout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					width: 200,
					minWidth: 80,
				},
				tabBarStyle: {
					paddingHorizontal: 20,
				},
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabBarIcon title="Home" icon="house" focused={focused} />
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabBarIcon
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
						<TabBarIcon title="Profile" icon="person" focused={focused} />
					),
				}}
			/>
			<Tabs.Screen
				name="saved"
				options={{
					title: "Saved",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabBarIcon title="Saved" icon="bookmark" focused={focused} />
					),
				}}
			/>
		</Tabs>
	)
}

export default TabsLayout
