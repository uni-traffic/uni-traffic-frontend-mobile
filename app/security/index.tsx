import { View } from "@/components/Themed";
import SecurityDashboard from "@/components/security/dashboard";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function Dashboard() {
  const { user } = useAuth();

  const router = useRouter();
  if (user?.role !== "SECURITY") {
    router.replace("/(user)");
  }

  return (
    <View style={styles.container}>
      <SecurityDashboard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
