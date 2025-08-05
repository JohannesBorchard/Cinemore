import { icons } from "@/constants/icons"
import { images } from "@/constants/images"
import { Image, ScrollView, Text, View } from "react-native"

export default function Index() {
	return (
		<View className="bg-slate-950 flex-1 items-center">
			<Image source={images.bg} className="absolute w-full z-0" />
			<ScrollView
				className="flex-1 px-5 min-h-full pb-10"
				showsVerticalScrollIndicator={false}>
				<Image source={icons.logo} className="w-12 h-10 mx-auto mb-5 mt-20" />
				<Text className="text-accent font-bold text-5xl">Welcome!</Text>
			</ScrollView>
		</View>
	)
}
