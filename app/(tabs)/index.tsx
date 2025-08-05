import { images } from "@/constants/images"
import { SymbolView } from "expo-symbols"
import { Image, ScrollView, Text, View } from "react-native"
import colors from "tailwindcss/colors"

export default function Index() {
	return (
		<View className="bg-slate-950 flex-1 items-center">
			<Image source={images.bg} className="absolute w-full z-0" />
			<ScrollView
				className="flex-1 px-5 min-h-full pb-10 pt-20"
				showsVerticalScrollIndicator={false}>
				<SymbolView
					name="film"
					size={50}
					tintColor={colors.pink[500]}
					weight="medium"
					style={{ marginHorizontal: "auto", marginBottom: 10 }}
				/>
				{/* <Image source={icons.logo} className="w-12 h-10 mx-auto mb-5 mt-20" /> */}
				<Text className="text-accent font-bold text-5xl">Welcome!</Text>
			</ScrollView>
		</View>
	)
}
