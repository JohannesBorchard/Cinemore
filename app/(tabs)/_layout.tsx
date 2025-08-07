import { AppHeader } from "@/shared/ui/branding/AppHeader"
import { AppTabs } from "@/shared/ui/navigation/AppTabs"
import { View } from "react-native"

export default function TabsLayout() {
	return (
		<View className="flex-1 bg-slate-950">
			<AppHeader />

			<View className="flex-1 px-5 ">
				<AppTabs />
			</View>
		</View>
	)
}
