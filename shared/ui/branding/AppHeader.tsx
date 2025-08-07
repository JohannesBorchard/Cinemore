import { AppLogo } from "@/shared/ui/branding/AppLogo"
import { BlurView } from "expo-blur"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export function AppHeader() {
	const insets = useSafeAreaInsets()

	return (
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
	)
}
