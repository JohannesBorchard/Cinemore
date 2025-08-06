import { images } from "@/constants/images"
import { SymbolView } from "expo-symbols"
import React from "react"
import { Image, Text, View } from "react-native"
import colors from "tailwindcss/colors"

const Profile = () => {
	return (
		<View className="bg-slate-950 flex-1 pt-20 items-center">
			<Image source={images.bg} className="absolute w-full z-0" />
			<View className="flex-row items-center gap-2 w-fit justify-center leading-none mb-5">
				<SymbolView
					name="film"
					size={45}
					tintColor={colors.purple[400]}
					weight="medium"
				/>
				<Text className="text-purple-300 font-bold text-4xl">Cinemore</Text>
			</View>
			<Text className="text-purple-400 font-bold text-2xl">Profile</Text>
		</View>
	)
}

export default Profile
