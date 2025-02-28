import ViolationPage from "@/components/security/violation-page";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native";

export default function Violation() {
  const { user } = useAuth();

  const router = useRouter();
  if (user?.role !== "SECURITY") {
    router.replace("/(user)");
  }

  return (
    <View style={styles.container}>
      <ViolationPage />
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