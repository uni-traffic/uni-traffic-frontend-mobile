import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Pressable } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          height: 72,
          elevation: 0,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
          borderColor: "black"
        },
        tabBarButton: (props) => (
          <Pressable {...props} android_ripple={{ borderless: true, color: "transparent" }} />
        ),
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true)
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          headerShown: false,
          tabBarIcon: () => <MaterialIcons name="home" size={24} color="white" />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: () => <Feather name="user" size={24} color="white" />
        }}
      />
    </Tabs>
  );
}
