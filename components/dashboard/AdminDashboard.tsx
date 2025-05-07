import WebOnlyAccessScreen from "@/components/common/IneligibleScreen";
import { StyleSheet, View } from "react-native";

export const AdminDashboard = () => {
  return (
    <View style={styles.container}>
      <WebOnlyAccessScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    width: "100%"
  }
});
