import SecurityDashboard from "@/components/dashboard/SecurityDashboard";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Dashboard() {
  const { user } = useAuth();

  const router = useRouter();
  if (user?.role !== "SECURITY") {
    router.replace("/(user)");
  }

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <SecurityDashboard />
    </View>
  );
}
