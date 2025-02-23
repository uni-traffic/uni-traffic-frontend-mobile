import { StyleSheet, Text, View } from "react-native";

export const ComingSoon = () => {
  return (
    <View style={styles.comingSoon}>
      <Text style={styles.comingSoonText}>Coming Soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  comingSoon: {
    zIndex: 1,
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  comingSoonText: {
    color: "white",
    fontWeight: "bold"
  }
});
