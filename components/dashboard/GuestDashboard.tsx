import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const GuestDashboard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Image style={styles.logo} source={require("../../assets/images/neu-logo.png")} />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>UNITRAFFIC</Text>
          </View>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <TouchableOpacity style={styles.menu} onPress={() => router.push("/register")}>
          <AntDesign style={styles.buttonIcon} name="form" size={22} color="black" />
          <Text style={styles.buttonText}>Apply for Vehicle Sticker</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu} onPress={() => router.push("/application")}>
          <MaterialCommunityIcons
            style={styles.buttonIcon}
            name="clipboard-file-outline"
            size={22}
            color="black"
          />
          <Text style={styles.buttonText}>View Sticker Application</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEAF0"
  },
  header: {
    backgroundColor: "black",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  headerText: {
    color: "white",
    fontSize: 40,
    alignSelf: "flex-start"
  },
  titleContainer: {
    flexDirection: "row",
    alignSelf: "center"
  },
  logo: {
    height: 60,
    width: 60,
    marginRight: 20,
    alignSelf: "center"
  },
  textContainer: {
    justifyContent: "center"
  },
  buttonText: {
    color: "black",
    fontSize: 16
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "flex-end",
    marginTop: 10
  },
  buttonIcon: {
    marginRight: 5,
    paddingLeft: 4
  },
  bodyContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 20
  },
  menu: {
    backgroundColor: "white",
    justifyContent: "center",
    width: "100%",
    height: 75,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  }
});
