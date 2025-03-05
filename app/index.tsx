import { useRouter } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LandingPage() {
  const router = useRouter();

  return (
    <ImageBackground style={styles.containerBox} source={require("../assets/images/neu-camp.png")}>
      <View style={styles.overlay} />
      <View style={styles.div1}>
        <Image source={require("../assets/images/UnitrafficLogo.png")} style={styles.logoImage} />
      </View>
      <View style={styles.div2}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/auth/login")}>
          <Text style={styles.textButton}>Get Started</Text>
        </TouchableOpacity>
        <Text style={styles.description}>
          UniTraffic simplifies vehicle identification and violation tracking at New Era University.
          Security can quickly scan license plates and issue e-violations, while users can easily
          view their violations and details.
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  containerBox: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.50)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  div1: {
    height: "70%",
    width: "100%",
    alignItems: "center"
  },
  div2: {
    height: "30%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 40
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 100
  },
  logoImage: {
    width: "80%",
    height: "35%",
    position: "relative",
    top: "20%"
  },
  button: {
    fontFamily: "singleline",
    fontSize: 16,
    width: 300,
    height: 36,
    borderWidth: 1,
    backgroundColor: "black",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 40,
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8
  },
  textButton: {
    color: "white"
  },
  description: {
    fontFamily: "roboto",
    textAlign: "center",
    color: "black",
    fontSize: 12,
    paddingHorizontal: 30
  }
});
