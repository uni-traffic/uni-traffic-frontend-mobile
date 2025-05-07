import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { ActivityIndicator, Image, ImageBackground, StyleSheet, Text, View } from "react-native";

export default function OAuthRedirect() {
  const router = useRouter();
  const { error } = useAuth();
  if (error) {
    router.replace("/auth/login");
  }

  return (
    <ImageBackground style={newStyles.main} source={require("../../assets/images/neu-camp.png")}>
      <View style={newStyles.overlay} />
      <View style={newStyles.logoContainer}>
        <Image style={newStyles.logo} source={require("../../assets/images/neu-logo.png")} />
      </View>
      <View style={newStyles.secondContainer}>
        <View style={newStyles.cardContainer}>
          <ActivityIndicator size={"large"} color="black" />
          <Text style={newStyles.loadingText}>Signing In...</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const newStyles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#EBEAF0",
    zIndex: 1
  },
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2
  },
  logoContainer: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3
  },
  logo: {
    position: "relative",
    top: 20,
    elevation: 5,
    height: 100,
    width: 100
  },
  secondContainer: {
    alignItems: "center",
    zIndex: 3
  },
  cardContainer: {
    width: "85%",
    height: "50%",
    borderWidth: 1.5,
    borderColor: "gray",
    borderRadius: 10,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    top: "20%",
    backgroundColor: "rgba(255, 255, 255, 0.97)"
  },
  loadingText: {
    marginTop: 10,
    color: "black"
  }
});
