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
				"flex flex-row items-center py-3 px-5 rounded-full mt-6 justify-center min-w-[90px]",
				focused && "bg-purple-400"
			)}>
			<SymbolView
				name={icon ? icon : "house.fill"}
				size={20}
				tintColor={focused ? "white" : colors.gray[500]}
				weight="medium"
			/>
			{focused && (
				<Text
					className={cn("ml-1", focused ? "text-white" : "text-gray-500")}
					numberOfLines={1}>
					{title ? title : "Home"}
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
					width: "100%",
					height: "100%",
					justifyContent: "center",
					alignItems: "center",
				},
				tabBarStyle: {
					paddingHorizontal: 20,
					backgroundColor: "transparent",
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
	)
}

export default TabsLayout
