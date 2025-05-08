import { Image, StyleSheet, Text, View } from "react-native";

export const VehicleNotFound = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <View style={styles.containerInfoHeader}>
          <View style={styles.containerInfoContent}>
            <Image source={require("../../assets/images/car-icon.png")} />
            <Text style={styles.title}>No Vehicle Information available</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "WHITE"
  },
  containerInfo: {
    flex: 1,
    alignItems: "center",
    width: "95%",
    margin: "2%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: "2%",
    paddingVertical: "5%"
  },
  containerInfoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "10%",
    width: "95%",
    backgroundColor: "#EBEAF0",
    margin: "2%",
    padding: "3%",
    borderRadius: 10
  },
  containerInfoContent: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontFamily: "ROBOTO",
    fontWeight: "400",
    marginHorizontal: 8
  }
});
