import { useAuth } from "@/context/authContext";
import { StyleSheet, View, Text } from "react-native";

export const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>{user?.role}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    width: "100%"
  },
  header: {
    backgroundColor: "black",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    marginRight: 30,
    marginLeft: 20
  },
  headerText: {
    color: "white",
    fontSize: 62,
    lineHeight: 72
  }
});
