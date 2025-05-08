import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const WebOnlyAccessScreen = () => {
  const handlePress = () => {
    Linking.openURL("https://uni-traffic.vercel.app/");
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="admin-panel-settings" size={80} color="black" />
      </View>

      <Text style={styles.title}>Web Dashboard Required</Text>

      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          Admin and Cashier features are only available on our web dashboard. Please use a desktop
          browser for full access to all management tools.
        </Text>
      </View>

      <View style={styles.rolesContainer}>
        <View style={styles.roleBadge}>
          <FontAwesome5 name="user-shield" size={16} color="black" />
          <Text style={styles.roleText}>ADMIN</Text>
        </View>
        <View style={styles.roleBadge}>
          <FontAwesome5 name="cash-register" size={16} color="black" />
          <Text style={styles.roleText}>CASHIER</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <AntDesign name="chrome" size={20} color="white" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Open Web Dashboard</Text>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>Access at:</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.urlText}>https://uni-traffic.vercel.app</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25
  },
  iconContainer: {
    marginBottom: 20
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
    textAlign: "center"
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 25,
    paddingHorizontal: 10
  },
  infoIcon: {
    marginRight: 10,
    marginTop: 3
  },
  message: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    textAlign: "center"
  },
  rolesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    flexWrap: "wrap"
  },
  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#white",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0"
  },
  roleText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#333",
    fontWeight: "500"
  },
  button: {
    flexDirection: "row",
    backgroundColor: "black",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  buttonIcon: {
    marginRight: 10
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600"
  },
  linkContainer: {
    alignItems: "center",
    marginBottom: 30
  },
  linkText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5
  },
  urlText: {
    fontSize: 14,
    color: "#009dff",
    textDecorationLine: "underline",
    fontWeight: "500"
  },
  helpContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20
  },
  helpText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8
  }
});

export default WebOnlyAccessScreen;
