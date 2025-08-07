import { AppLogo } from "@/shared/ui/branding/AppLogo"
import { AppTabs } from "@/shared/ui/navigation/AppTabs"
import { BlurView } from "expo-blur"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function TabsLayout() {
	const insets = useSafeAreaInsets()

	return (
		<View className="flex-1 bg-slate-950">
			<BlurView
				intensity={80}
				tint="dark"
				className="w-full absolute z-10"
				style={{
					paddingTop: insets.top,
					paddingBottom: 15,
				}}>
				<View className="items-center">
					<AppLogo />
				</View>
			</BlurView>

			<View className="flex-1 px-5">
				<AppTabs />
			</View>
		</View>
	)
}
