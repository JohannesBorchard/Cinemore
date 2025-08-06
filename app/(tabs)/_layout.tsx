import { images } from "@/constants/images"
import { AppLogo } from "@/shared/ui/AppLogo"
import { AppTabs } from "@/shared/ui/AppTabs"
import { Image, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function TabsLayout() {
	const insets = useSafeAreaInsets()

	return (
		<View className="flex-1 bg-slate-950">
			<Image
				source={images.bg}
				className="absolute w-full h-full z-0"
				resizeMode="cover"
				fadeDuration={0}
			/>

			<View className="absolute w-full z-10" style={{ top: insets.top + 20 }}>
				<View className="items-center">
					<AppLogo />
				</View>
			</View>

			<View className="flex-1 px-5">
				<AppTabs />
			</View>
		</View>
	)
}
