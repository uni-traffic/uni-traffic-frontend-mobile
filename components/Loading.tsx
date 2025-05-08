import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size={"large"} color="black" />
      <Text style={styles.loadingText}>Processing Image...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  loadingText: {
    marginTop: 10,
    color: "black"
  }
});
