import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Pressable, TouchableOpacity, View } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@/context/authContext";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();

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
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
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
              <TouchableOpacity>
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
