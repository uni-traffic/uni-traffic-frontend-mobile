import { View } from "@/components/Themed";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { GuestDashboard } from "@/components/dashboard/GuestDashboard";
import { VerifiedUserDashboard } from "@/components/dashboard/VerifiedUserDashboard";
import { useAuth } from "@/context/AuthContext";
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
      {user?.role === "ADMIN" || user?.role === "SUPERADMIN" || user?.role === "CASHIER" ? (
        <AdminDashboard />
      ) : user?.role === "STUDENT" || user?.role === "STAFF" ? (
        <VerifiedUserDashboard />
      ) : (
        <GuestDashboard />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
