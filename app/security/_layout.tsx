import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useRouter } from "expo-router";
import { Pressable, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "relative",
          height: 72,
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
        name="camera"
        options={{
          title: "",
          headerShown: false,
          tabBarStyle: { display: "none" },
          tabBarIcon: () => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 70,
                width: 70,
                borderRadius: 999,
                backgroundColor: "white",
                borderWidth: 2,
                marginBottom: 32
              }}
            >
              <TouchableOpacity onPress={() => router.push("/security/camera")}>
                <FontAwesome name="qrcode" size={28} color={"black"} />
              </TouchableOpacity>
            </View>
          )
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
