import { Text, View } from "@/components/Themed";
import { useAuth } from "@/context/authContext";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function Profile() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => logout()}>
          <Text style={styles.textButton}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  },
  button: {
    width: 150,
    height: 40,
    borderWidth: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: 10,
    alignSelf: "flex-end"
  },
  textButton: {
    color: "white"
  }
});
