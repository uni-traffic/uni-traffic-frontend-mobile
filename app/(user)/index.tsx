import { View } from "@/components/Themed";
import { AdminDashboard } from "@/components/admin/dashboard";
import { UserDashboard } from "@/components/user/dashboard";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function Dashboard() {
  const { user } = useAuth();

  const router = useRouter();
  if (user?.role === "SECURITY") {
    router.replace("/security");
  }

  return (
    <View style={styles.container}>
      {user?.role === "ADMIN" && <AdminDashboard />}
      {(user?.role === "STUDENT" || user?.role === "STAFF" || user?.role === "GUEST") && (
        <UserDashboard />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
